import os
import unittest

from services.credit.client import normalizar_resposta_bureau
from services.credit.providers import load_bureau_config


class CreditProviderTest(unittest.TestCase):
    def tearDown(self):
        for key in (
            "BUREAU_PROVIDER",
            "BUREAU_ENV",
            "SERASA_BASE_URL",
            "SERASA_ENV",
            "BOAVISTA_BASE_URL",
            "QUOD_BASE_URL",
        ):
            os.environ.pop(key, None)

    def test_default_provider_starts_in_mock_mode_without_production_tokens(self):
        config = load_bureau_config()
        self.assertTrue(config.use_mock)

    def test_provider_can_switch_to_boavista(self):
        os.environ["BUREAU_PROVIDER"] = "boavista"
        os.environ["BUREAU_ENV"] = "production"
        os.environ["BOAVISTA_BASE_URL"] = "https://api.boavista.exemplo"
        config = load_bureau_config()
        self.assertEqual(config.provider, "boavista")
        self.assertFalse(config.use_mock)

    def test_normalizer_respects_fallback_provider(self):
        normalized = normalizar_resposta_bureau(
            {"document": "123", "score": 500},
            document_type="CPF",
            fallback_provider="boavista_mock",
        )
        self.assertEqual(normalized["provider"], "boavista_mock")
        self.assertEqual(normalized["document_type"], "CPF")


if __name__ == "__main__":
    unittest.main()
