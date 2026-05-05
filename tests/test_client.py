import unittest
from unittest.mock import patch

from agente_cnpj.client import ConsultaCNPJErro, consultar_cnpj


class ClientTest(unittest.TestCase):
    def test_usa_fallback_quando_primeira_fonte_falha(self):
        def fake_baixar_json(url, timeout):
            if "brasilapi" in url:
                raise ConsultaCNPJErro("HTTP 404: nao encontrado")
            return {"cnpj": "03284632000112", "razao_social": "M P DOS SANTOS & CIA. LTDA"}

        with patch("agente_cnpj.client._baixar_json", side_effect=fake_baixar_json):
            dados = consultar_cnpj("03.284.632/0001-12")

        self.assertEqual(dados["razao_social"], "M P DOS SANTOS & CIA. LTDA")
        self.assertEqual(dados["fonte_consulta"], "Minha Receita")


if __name__ == "__main__":
    unittest.main()
