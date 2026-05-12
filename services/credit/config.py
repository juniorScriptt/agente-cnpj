from __future__ import annotations

import hashlib
import json
from pathlib import Path
from typing import Any


ROOT = Path(__file__).resolve().parents[2]
DATA_DIR = ROOT / "data"
CONFIG_PATH = DATA_DIR / "bureau_config.json"


def load_bureau_settings() -> dict[str, Any]:
    if not CONFIG_PATH.exists():
        return {}
    try:
        payload = json.loads(CONFIG_PATH.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError):
        return {}
    return payload if isinstance(payload, dict) else {}


def save_bureau_settings(settings: dict[str, Any]) -> dict[str, Any]:
    DATA_DIR.mkdir(parents=True, exist_ok=True)
    CONFIG_PATH.write_text(json.dumps(settings, ensure_ascii=False, indent=2), encoding="utf-8")
    return settings


def hash_secret(value: str) -> str:
    return hashlib.sha256(str(value or "").encode("utf-8")).hexdigest()


def verify_validation_password(settings: dict[str, Any], candidate: str) -> bool:
    security = settings.get("security", {}) if isinstance(settings.get("security"), dict) else {}
    expected = str(security.get("validation_password_hash") or "").strip()
    normalized_candidate = str(candidate or "").strip()
    if not expected or not normalized_candidate:
        return False
    return hash_secret(normalized_candidate) == expected


def bureau_settings_view(settings: dict[str, Any]) -> dict[str, Any]:
    providers = settings.get("providers", {})
    current = settings.get("provider", "mock")
    current_data = providers.get(current, {})
    security = settings.get("security", {}) if isinstance(settings.get("security"), dict) else {}
    features = settings.get("features", {}) if isinstance(settings.get("features"), dict) else {}
    return {
        "provider": current,
        "environment": settings.get("environment", "sandbox"),
        "providers": {
            name: {
                "base_url": str(data.get("base_url", "")),
                "client_id": str(data.get("client_id", "")),
                "has_client_secret": bool(data.get("client_secret")),
                "auth_mode": str(data.get("auth_mode", "oauth")),
                "username": str(data.get("username", "")),
                "has_password": bool(data.get("password")),
                "has_api_token": bool(data.get("api_token")),
                "has_sso_token": bool(data.get("sso_token")),
                "origin": str(data.get("origin", "https://sistema.scccheck.com.br")),
                "portal_url": str(data.get("portal_url", "")),
                "consult_path": str(data.get("consult_path", "")),
                "token_path": str(data.get("token_path", "/oauth/token")),
                "product_code": str(data.get("product_code", "")),
            }
            for name, data in providers.items()
            if isinstance(data, dict)
        },
        "config_path": str(CONFIG_PATH),
        "active_base_url": str(current_data.get("base_url", "")),
        "active_client_id": str(current_data.get("client_id", "")),
        "active_has_secret": bool(current_data.get("client_secret")),
        "active_auth_mode": str(current_data.get("auth_mode", "oauth")),
        "active_username": str(current_data.get("username", "")),
        "active_has_password": bool(current_data.get("password")),
        "active_has_api_token": bool(current_data.get("api_token")),
        "active_has_sso_token": bool(current_data.get("sso_token")),
        "active_origin": str(current_data.get("origin", "https://sistema.scccheck.com.br")),
        "active_portal_url": str(current_data.get("portal_url", "")),
        "active_consult_path": str(current_data.get("consult_path", "")),
        "active_token_path": str(current_data.get("token_path", "/oauth/token")),
        "active_product_code": str(current_data.get("product_code", "")),
        "security": {
            "has_validation_password": bool(security.get("validation_password_hash")),
        },
        "features": {
            "serasa_premium_enabled": bool(features.get("serasa_premium_enabled")),
            "allow_scc_check": bool(features.get("allow_scc_check")),
        },
    }
