from __future__ import annotations

import hashlib
import hmac
import json
import secrets
from pathlib import Path
from typing import Any


ROOT = Path(__file__).resolve().parents[1]
DATA_DIR = ROOT / "data"
USERS_PATH = DATA_DIR / "users.json"

DEFAULT_PASSWORD = "Scriptt@123"
REMEMBER_LOGIN_KEY = "agente_cnpj.remembered_login"

ROLE_PERMISSIONS = {
    "Admin": [
        "consultar_cnpj",
        "consultar_cpf",
        "analisar_carteira",
        "usar_serasa_premium",
        "usar_scc_check",
        "gerenciar_credenciais_serasa",
        "configurar_modulos",
        "ver_auditoria",
    ],
    "Analista": [
        "consultar_cnpj",
        "consultar_cpf",
        "analisar_carteira",
        "usar_serasa_premium",
        "usar_scc_check",
    ],
    "Comercial": [
        "consultar_cnpj",
        "consultar_cpf",
        "ver_recomendacao",
    ],
    "Auditoria": [
        "ver_auditoria",
        "exportar_relatorios",
    ],
}

_SESSIONS: dict[str, dict[str, Any]] = {}


def password_hash(password: str) -> str:
    return hashlib.sha256(str(password or "").encode("utf-8")).hexdigest()


def verify_password(password: str, hashed: str) -> bool:
    return hmac.compare_digest(password_hash(password), str(hashed or ""))


def default_permissions(role: str) -> list[str]:
    return list(ROLE_PERMISSIONS.get(role, ROLE_PERMISSIONS["Analista"]))


def _default_admin() -> dict[str, Any]:
    return {
        "id": "admin-default",
        "name": "Administrador Scriptt",
        "email": "admin@scriptt",
        "role": "Admin",
        "status": "Ativo",
        "permissions": default_permissions("Admin"),
        "password_hash": password_hash(DEFAULT_PASSWORD),
        "must_change_password": True,
    }


def load_users() -> list[dict[str, Any]]:
    if not USERS_PATH.exists():
        return [_default_admin()]
    try:
        payload = json.loads(USERS_PATH.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError):
        return [_default_admin()]
    if not isinstance(payload, list) or not payload:
        return [_default_admin()]
    normalized = []
    for item in payload:
        if not isinstance(item, dict):
            continue
        role = str(item.get("role") or "Analista")
        normalized.append(
            {
                "id": str(item.get("id") or secrets.token_hex(8)),
                "name": str(item.get("name") or "").strip(),
                "email": str(item.get("email") or "").strip().lower(),
                "role": role,
                "status": str(item.get("status") or "Ativo"),
                "permissions": list(item.get("permissions") or default_permissions(role)),
                "password_hash": str(item.get("password_hash") or ""),
                "must_change_password": bool(item.get("must_change_password")),
            }
        )
    return normalized or [_default_admin()]


def save_users(users: list[dict[str, Any]]) -> list[dict[str, Any]]:
    DATA_DIR.mkdir(parents=True, exist_ok=True)
    USERS_PATH.write_text(json.dumps(users, ensure_ascii=False, indent=2), encoding="utf-8")
    return users


def list_users_view() -> list[dict[str, Any]]:
    return [
        {
            "id": user["id"],
            "name": user["name"],
            "email": user["email"],
            "role": user["role"],
            "status": user["status"],
            "permissions": user.get("permissions") or default_permissions(user["role"]),
            "must_change_password": bool(user.get("must_change_password")),
        }
        for user in load_users()
    ]


def upsert_user(
    *,
    name: str,
    email: str,
    role: str,
    status: str,
    permissions: list[str] | None = None,
    password: str = "",
) -> dict[str, Any]:
    users = load_users()
    normalized_email = str(email or "").strip().lower()
    current = next((item for item in users if item["email"] == normalized_email), None)
    permission_list = permissions or default_permissions(role)
    hashed = password_hash(password) if password else (current.get("password_hash") if current else "")
    must_change_password = bool(current.get("must_change_password")) if current else False
    if password:
        must_change_password = True
    user = {
        "id": current["id"] if current else secrets.token_hex(8),
        "name": str(name or "").strip(),
        "email": normalized_email,
        "role": role,
        "status": status,
        "permissions": permission_list,
        "password_hash": hashed,
        "must_change_password": must_change_password,
    }
    users = [user, *[item for item in users if item["email"] != normalized_email]]
    save_users(users[:100])
    return user


def authenticate(login: str, password: str) -> dict[str, Any] | None:
    normalized = str(login or "").strip().lower()
    for user in load_users():
        if user["email"] != normalized:
            continue
        if str(user.get("status") or "").lower() != "ativo":
            return None
        if verify_password(password, str(user.get("password_hash") or "")):
            return {
                "id": user["id"],
                "name": user["name"],
                "email": user["email"],
                "role": user["role"],
                "status": user["status"],
                "permissions": user.get("permissions") or default_permissions(user["role"]),
                "must_change_password": bool(user.get("must_change_password")),
            }
    return None


def create_session(user: dict[str, Any]) -> str:
    token = secrets.token_urlsafe(32)
    _SESSIONS[token] = user
    return token


def get_session(token: str) -> dict[str, Any] | None:
    return _SESSIONS.get(token)


def delete_session(token: str) -> None:
    _SESSIONS.pop(token, None)


def change_password(email: str, new_password: str) -> dict[str, Any] | None:
    users = load_users()
    normalized_email = str(email or "").strip().lower()
    updated = None
    for item in users:
        if item["email"] == normalized_email:
            item["password_hash"] = password_hash(new_password)
            item["must_change_password"] = False
            updated = item
            break
    if not updated:
        return None
    save_users(users)
    return {
        "id": updated["id"],
        "name": updated["name"],
        "email": updated["email"],
        "role": updated["role"],
        "status": updated["status"],
        "permissions": updated.get("permissions") or default_permissions(updated["role"]),
        "must_change_password": False,
    }
