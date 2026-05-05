import unittest

from agente_cnpj.cnpj import formatar_cnpj, normalizar_cnpj, validar_cnpj


class CNPJTest(unittest.TestCase):
    def test_normaliza_cnpj(self):
        self.assertEqual(normalizar_cnpj("11.222.333/0001-81"), "11222333000181")

    def test_valida_cnpj_correto(self):
        self.assertTrue(validar_cnpj("11.222.333/0001-81"))

    def test_rejeita_cnpj_invalido(self):
        self.assertFalse(validar_cnpj("11.222.333/0001-82"))
        self.assertFalse(validar_cnpj("00.000.000/0000-00"))
        self.assertFalse(validar_cnpj("123"))

    def test_formata_cnpj(self):
        self.assertEqual(formatar_cnpj("11222333000181"), "11.222.333/0001-81")


if __name__ == "__main__":
    unittest.main()
