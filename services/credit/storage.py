from __future__ import annotations

import json
import sqlite3
from datetime import datetime, timezone
from pathlib import Path
from typing import Any


ROOT = Path(__file__).resolve().parents[2]
DATA_DIR = ROOT / "data"
DB_PATH = DATA_DIR / "credit.db"


SCHEMA = """
CREATE TABLE IF NOT EXISTS credit_queries (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  document TEXT NOT NULL,
  document_type TEXT NOT NULL,
  provider TEXT NOT NULL,
  query_reason TEXT,
  legal_basis TEXT,
  product TEXT,
  queried_by TEXT,
  ip_address TEXT,
  created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS credit_scores (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  query_id INTEGER,
  document TEXT NOT NULL,
  document_type TEXT NOT NULL,
  provider TEXT NOT NULL,
  score INTEGER,
  score_final INTEGER,
  risk_level TEXT,
  recommended_limit REAL,
  decision TEXT,
  reasons TEXT,
  created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS serasa_raw_responses (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  query_id INTEGER,
  document TEXT NOT NULL,
  document_type TEXT NOT NULL,
  provider TEXT NOT NULL,
  raw_response TEXT,
  normalized_response TEXT,
  created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS portfolio_analysis (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  total_analyzed INTEGER,
  low_risk INTEGER,
  medium_risk INTEGER,
  high_risk INTEGER,
  critical_risk INTEGER,
  total_recommended_limit REAL,
  queried_by TEXT,
  query_reason TEXT,
  created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS portfolio_items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  portfolio_id INTEGER,
  document TEXT NOT NULL,
  document_type TEXT NOT NULL,
  provider TEXT NOT NULL,
  raw_response TEXT,
  normalized_response TEXT,
  score INTEGER,
  risk_level TEXT,
  recommended_limit REAL,
  decision TEXT,
  created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS credit_audit_logs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  document TEXT,
  document_type TEXT,
  provider TEXT,
  action TEXT NOT NULL,
  queried_by TEXT,
  query_reason TEXT,
  legal_basis TEXT,
  product TEXT,
  ip_address TEXT,
  metadata TEXT,
  created_at TEXT NOT NULL
);
"""


def init_db() -> None:
    DATA_DIR.mkdir(parents=True, exist_ok=True)
    with sqlite3.connect(DB_PATH) as conn:
        conn.executescript(SCHEMA)


def now_iso() -> str:
    return datetime.now(timezone.utc).astimezone().isoformat(timespec="seconds")


def register_query(
    *,
    document: str,
    document_type: str,
    provider: str,
    queried_by: str,
    query_reason: str,
    legal_basis: str,
    product: str,
    ip_address: str,
) -> int:
    init_db()
    created_at = now_iso()
    with sqlite3.connect(DB_PATH) as conn:
        cursor = conn.execute(
            """
            INSERT INTO credit_queries
            (document, document_type, provider, query_reason, legal_basis, product, queried_by, ip_address, created_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
            """,
            (document, document_type, provider, query_reason, legal_basis, product, queried_by, ip_address, created_at),
        )
        query_id = int(cursor.lastrowid)
    audit(
        document=document,
        document_type=document_type,
        provider=provider,
        action="credit_query_requested",
        queried_by=queried_by,
        query_reason=query_reason,
        legal_basis=legal_basis,
        product=product,
        ip_address=ip_address,
        metadata={"query_id": query_id},
    )
    return query_id


def save_score(query_id: int, normalized: dict[str, Any]) -> None:
    init_db()
    created_at = now_iso()
    with sqlite3.connect(DB_PATH) as conn:
        conn.execute(
            """
            INSERT INTO credit_scores
            (query_id, document, document_type, provider, score, score_final, risk_level, recommended_limit, decision, reasons, created_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """,
            (
                query_id,
                normalized.get("document", ""),
                normalized.get("document_type", ""),
                normalized.get("provider", ""),
                normalized.get("score_serasa"),
                normalized.get("score_final"),
                normalized.get("risk_level"),
                normalized.get("recommended_limit"),
                normalized.get("decision"),
                json.dumps(normalized.get("reasons", []), ensure_ascii=False),
                created_at,
            ),
        )


def save_raw_response(query_id: int, raw: dict[str, Any], normalized: dict[str, Any]) -> None:
    init_db()
    created_at = now_iso()
    with sqlite3.connect(DB_PATH) as conn:
        conn.execute(
            """
            INSERT INTO serasa_raw_responses
            (query_id, document, document_type, provider, raw_response, normalized_response, created_at)
            VALUES (?, ?, ?, ?, ?, ?, ?)
            """,
            (
                query_id,
                normalized.get("document", ""),
                normalized.get("document_type", ""),
                normalized.get("provider", ""),
                json.dumps(raw, ensure_ascii=False),
                json.dumps(normalized, ensure_ascii=False),
                created_at,
            ),
        )


def save_portfolio(analysis: dict[str, Any], *, queried_by: str, query_reason: str) -> int:
    init_db()
    created_at = now_iso()
    summary = analysis.get("summary", {})
    with sqlite3.connect(DB_PATH) as conn:
        cursor = conn.execute(
            """
            INSERT INTO portfolio_analysis
            (total_analyzed, low_risk, medium_risk, high_risk, critical_risk, total_recommended_limit, queried_by, query_reason, created_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
            """,
            (
                summary.get("total_analisado", 0),
                summary.get("baixo", 0),
                summary.get("medio", 0),
                summary.get("alto", 0),
                summary.get("critico", 0),
                summary.get("limite_total_recomendado", 0),
                queried_by,
                query_reason,
                created_at,
            ),
        )
        portfolio_id = int(cursor.lastrowid)
        for item in analysis.get("items", []):
            conn.execute(
                """
                INSERT INTO portfolio_items
                (portfolio_id, document, document_type, provider, raw_response, normalized_response, score, risk_level, recommended_limit, decision, created_at)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                """,
                (
                    portfolio_id,
                    item.get("document", ""),
                    item.get("document_type", ""),
                    item.get("provider", ""),
                    json.dumps(item.get("raw_response", {}), ensure_ascii=False),
                    json.dumps(item, ensure_ascii=False),
                    item.get("score_serasa"),
                    item.get("risk_level"),
                    item.get("recommended_limit"),
                    item.get("decision"),
                    created_at,
                ),
            )
    return portfolio_id


def audit(
    *,
    action: str,
    provider: str = "",
    document: str = "",
    document_type: str = "",
    queried_by: str = "",
    query_reason: str = "",
    legal_basis: str = "",
    product: str = "",
    ip_address: str = "",
    metadata: dict[str, Any] | None = None,
) -> None:
    init_db()
    with sqlite3.connect(DB_PATH) as conn:
        conn.execute(
            """
            INSERT INTO credit_audit_logs
            (document, document_type, provider, action, queried_by, query_reason, legal_basis, product, ip_address, metadata, created_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """,
            (
                document,
                document_type,
                provider,
                action,
                queried_by,
                query_reason,
                legal_basis,
                product,
                ip_address,
                json.dumps(metadata or {}, ensure_ascii=False),
                now_iso(),
            ),
        )


def stats() -> dict[str, Any]:
    init_db()
    with sqlite3.connect(DB_PATH) as conn:
        conn.row_factory = sqlite3.Row
        total = conn.execute("SELECT COUNT(*) AS total FROM credit_queries").fetchone()["total"]
        audits = conn.execute("SELECT COUNT(*) AS total FROM credit_audit_logs").fetchone()["total"]
        scores = conn.execute(
            "SELECT risk_level, COUNT(*) AS total FROM credit_scores GROUP BY risk_level"
        ).fetchall()
        providers = conn.execute(
            "SELECT provider, COUNT(*) AS total FROM credit_queries GROUP BY provider"
        ).fetchall()
    return {
        "credit_queries": total,
        "credit_audit_logs": audits,
        "risk_distribution": {row["risk_level"] or "indefinido": row["total"] for row in scores},
        "provider_distribution": {row["provider"] or "indefinido": row["total"] for row in providers},
        "database": str(DB_PATH),
    }
