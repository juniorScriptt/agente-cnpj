import json
import tempfile
import unittest
from pathlib import Path
from unittest.mock import patch

from services.credit import config as bureau_config


class BureauConfigTest(unittest.TestCase):
    def test_view_masks_secret_and_keeps_metadata(self):
        payload = {
            "provider": "serasa",
            "environment": "production",
            "providers": {
                "serasa": {
                    "base_url": "https://api.serasa.exemplo",
                    "client_id": "abc",
                    "client_secret": "secret",
                }
            },
        }
        view = bureau_config.bureau_settings_view(payload)
        self.assertEqual(view["provider"], "serasa")
        self.assertEqual(view["active_client_id"], "abc")
        self.assertTrue(view["active_has_secret"])
        rendered = json.dumps(view)
        self.assertNotIn('"client_secret": "secret"', rendered)
        self.assertNotIn(': "secret"', rendered)

    def test_save_and_load_settings_roundtrip(self):
        with tempfile.TemporaryDirectory() as temp_dir:
            config_path = Path(temp_dir) / "bureau.json"
            payload = {"provider": "mock", "environment": "sandbox", "providers": {}}
            with patch.object(bureau_config, "CONFIG_PATH", config_path), patch.object(
                bureau_config, "DATA_DIR", config_path.parent
            ):
                bureau_config.save_bureau_settings(payload)
                loaded = bureau_config.load_bureau_settings()
        self.assertEqual(loaded["provider"], "mock")


if __name__ == "__main__":
    unittest.main()
