from __future__ import annotations

import json
import os
from dataclasses import dataclass
from typing import Any
from urllib.error import HTTPError, URLError
from urllib.request import Request, urlopen

from .config import load_bureau_settings

class BureauProviderError(RuntimeError):
    pass


@dataclass(frozen=True)
class BureauConfig:
    provider: str
    env: str
    base_url: str
    client_id: str
    client_secret: str
    auth_mode: str = "oauth"
    username: str = ""
    password: str = ""
    api_token: str = ""
    sso_token: str = ""
    origin: str = "https://sistema.scccheck.com.br"
    portal_url: str = ""
    consult_path: str = ""
    token_path: str = "/oauth/token"
    product_code: str = ""

    @property
    def use_mock(self) -> bool:
        return self.provider == "mock" or self.env != "production" or not self.base_url


def load_bureau_config() -> BureauConfig:
    stored = load_bureau_settings()
    provider = os.getenv("BUREAU_PROVIDER", "").strip().lower()
    if not provider:
        provider = str(stored.get("provider") or "").strip().lower()
    if not provider:
        provider = "serasa" if os.getenv("SERASA_BASE_URL") else "mock"

    env = os.getenv("BUREAU_ENV", os.getenv("SERASA_ENV", "")).strip().lower()
    if not env:
        env = str(stored.get("environment") or "sandbox").strip().lower()
    stored_providers = stored.get("providers", {}) if isinstance(stored.get("providers"), dict) else {}
    current = stored_providers.get(provider, {}) if isinstance(stored_providers.get(provider), dict) else {}
    if provider != "mock":
        base_url_present = bool(str(current.get("base_url") or os.getenv(f"{provider.upper()}_BASE_URL", "") or "").strip())
        if not base_url_present:
            provider = "mock"
            current = {}
    if provider == "serasa":
        return BureauConfig(
            provider="serasa",
            env=env,
            base_url=str(os.getenv("SERASA_BASE_URL", "") or current.get("base_url") or "").rstrip("/"),
            client_id=str(os.getenv("SERASA_CLIENT_ID", "") or current.get("client_id") or ""),
            client_secret=str(os.getenv("SERASA_CLIENT_SECRET", "") or current.get("client_secret") or ""),
            auth_mode=str(os.getenv("SERASA_AUTH_MODE", "") or current.get("auth_mode") or "oauth").strip().lower(),
            username=str(os.getenv("SERASA_USERNAME", "") or current.get("username") or ""),
            password=str(os.getenv("SERASA_PASSWORD", "") or current.get("password") or ""),
            api_token=str(os.getenv("SERASA_API_TOKEN", "") or current.get("api_token") or ""),
            sso_token=str(os.getenv("SERASA_SSO_TOKEN", "") or current.get("sso_token") or ""),
            origin=str(os.getenv("SERASA_ORIGIN", "") or current.get("origin") or "https://sistema.scccheck.com.br"),
            portal_url=str(os.getenv("SERASA_PORTAL_URL", "") or current.get("portal_url") or ""),
            consult_path=str(os.getenv("SERASA_CONSULT_PATH", "") or current.get("consult_path") or ""),
            token_path=str(os.getenv("SERASA_TOKEN_PATH", "") or current.get("token_path") or "/oauth/token"),
            product_code=str(os.getenv("SERASA_PRODUCT_CODE", "") or current.get("product_code") or ""),
        )
    if provider == "boavista":
        return BureauConfig(
            provider="boavista",
            env=env,
            base_url=str(os.getenv("BOAVISTA_BASE_URL", "") or current.get("base_url") or "").rstrip("/"),
            client_id=str(os.getenv("BOAVISTA_CLIENT_ID", "") or current.get("client_id") or ""),
            client_secret=str(os.getenv("BOAVISTA_CLIENT_SECRET", "") or current.get("client_secret") or ""),
        )
    if provider == "quod":
        return BureauConfig(
            provider="quod",
            env=env,
            base_url=str(os.getenv("QUOD_BASE_URL", "") or current.get("base_url") or "").rstrip("/"),
            client_id=str(os.getenv("QUOD_CLIENT_ID", "") or current.get("client_id") or ""),
            client_secret=str(os.getenv("QUOD_CLIENT_SECRET", "") or current.get("client_secret") or ""),
        )
    return BureauConfig(provider="mock", env=env, base_url="", client_id="", client_secret="")


class BureauProvider:
    provider_name = "mock"

    def __init__(self, config: BureauConfig) -> None:
        self.config = config

    def consultar(self, document: str, document_type: str, options: dict[str, Any] | None = None) -> dict[str, Any]:
        raise NotImplementedError


class MockProvider(BureauProvider):
    provider_name = "mock"

    def consultar(self, document: str, document_type: str, options: dict[str, Any] | None = None) -> dict[str, Any]:
        return _mock_response(document, document_type)


class SerasaProvider(BureauProvider):
    provider_name = "serasa"

    def consultar(self, document: str, document_type: str, options: dict[str, Any] | None = None) -> dict[str, Any]:
        if self.config.use_mock:
            return _mock_response(document, document_type)
        options = options or {}
        if self.config.auth_mode == "bearer_sso":
            return self._consultar_por_tokens(document, document_type, options)
        if self.config.auth_mode == "logon":
            return self._consultar_por_logon(document, document_type, options)
        token = self._token()
        endpoint = "cnpj" if document_type == "CNPJ" else "cpf"
        request = Request(
            f"{self.config.base_url}/credito/{endpoint}/{document}",
            headers={
                "Authorization": f"Bearer {token}",
                "Accept": "application/json",
            },
            method="GET",
        )
        return _request_json(request, "Serasa")

    def _token(self) -> str:
        request = Request(
            f"{self.config.base_url}{self.config.token_path or '/oauth/token'}",
            data=json.dumps(
                {
                    "grant_type": "client_credentials",
                    "client_id": self.config.client_id,
                    "client_secret": self.config.client_secret,
                }
            ).encode("utf-8"),
            headers={
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            method="POST",
        )
        payload = _request_json(request, "Autenticação Serasa")
        token = payload.get("access_token")
        if not token:
            raise BureauProviderError("Token Serasa ausente na resposta.")
        return str(token)

    def _consultar_por_logon(self, document: str, document_type: str, options: dict[str, Any]) -> dict[str, Any]:
        if not self.config.consult_path or not self.config.username or not self.config.password:
            raise BureauProviderError(
                "Serasa logon/senha configurado sem caminho de consulta ou credenciais completas."
            )
        request = Request(
            f"{self.config.base_url}{self.config.consult_path}",
            data=json.dumps(
                {
                    "login": self.config.username,
                    "senha": self.config.password,
                    "document": document,
                    "document_type": document_type,
                    "product": str(options.get("product") or self.config.product_code or ""),
                    "subject_name": str(options.get("subject_name") or ""),
                }
            ).encode("utf-8"),
            headers={
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            method="POST",
        )
        return _request_json(request, "Serasa")

    def _consultar_por_tokens(self, document: str, document_type: str, options: dict[str, Any]) -> dict[str, Any]:
        if not self.config.consult_path or not self.config.api_token or not self.config.sso_token:
            raise BureauProviderError(
                "SCC Check configurado sem endpoint de consulta ou tokens Bearer/SSO."
            )
        product = str(options.get("product") or self.config.product_code or "").strip()
        subject_name = str(options.get("subject_name") or "").strip()
        query = [
            ("document", document),
            ("document_type", document_type),
        ]
        if product:
            query.append(("product", product))
        if subject_name:
            query.append(("subject_name", subject_name))
        from urllib.parse import urlencode

        url = f"{self.config.base_url}{self.config.consult_path}"
        if query:
            url = f"{url}?{urlencode(query)}"
        request = Request(
            url,
            headers={
                "Accept": "application/json",
                "Authorization": f"Bearer {self.config.api_token}",
                "Ssotoken": self.config.sso_token,
                "Origin": self.config.origin or "https://sistema.scccheck.com.br",
            },
            method="GET",
        )
        return _request_json(request, "SCC Check")


class GenericOAuthProvider(BureauProvider):
    label = "Bureau"

    def consultar(self, document: str, document_type: str, options: dict[str, Any] | None = None) -> dict[str, Any]:
        if self.config.use_mock:
            return _mock_response(document, document_type)
        token = self._token()
        endpoint = "cnpj" if document_type == "CNPJ" else "cpf"
        request = Request(
            f"{self.config.base_url}/credito/{endpoint}/{document}",
            headers={
                "Authorization": f"Bearer {token}",
                "Accept": "application/json",
            },
            method="GET",
        )
        return _request_json(request, self.label)

    def _token(self) -> str:
        request = Request(
            f"{self.config.base_url}/oauth/token",
            data=json.dumps(
                {
                    "grant_type": "client_credentials",
                    "client_id": self.config.client_id,
                    "client_secret": self.config.client_secret,
                }
            ).encode("utf-8"),
            headers={
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            method="POST",
        )
        payload = _request_json(request, f"Autenticação {self.label}")
        token = payload.get("access_token")
        if not token:
            raise BureauProviderError(f"Token {self.label} ausente na resposta.")
        return str(token)


class BoaVistaProvider(GenericOAuthProvider):
    provider_name = "boavista"
    label = "Boa Vista"


class QuodProvider(GenericOAuthProvider):
    provider_name = "quod"
    label = "Quod"


def build_provider(config: BureauConfig | None = None) -> BureauProvider:
    current = config or load_bureau_config()
    if current.provider == "serasa":
        return SerasaProvider(current)
    if current.provider == "boavista":
        return BoaVistaProvider(current)
    if current.provider == "quod":
        return QuodProvider(current)
    return MockProvider(current)


def _request_json(request: Request, label: str) -> dict[str, Any]:
    try:
        with urlopen(request, timeout=25) as response:
            return json.loads(response.read().decode("utf-8"))
    except HTTPError as exc:
        raise BureauProviderError(f"{label} HTTP {exc.code}") from exc
    except URLError as exc:
        raise BureauProviderError(f"Falha de conexão com {label}.") from exc


def _mock_response(document: str, document_type: str) -> dict[str, Any]:
    from services.serasa.mock import resposta_mock

    return resposta_mock(document, document_type)
