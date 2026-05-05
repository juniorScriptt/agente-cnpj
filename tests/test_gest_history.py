import unittest

from agente_cnpj.gest_db import gerar_parecer_historico_interno


class GestHistoryRulesTest(unittest.TestCase):
    def test_favorable_internal_history_opinion(self):
        parecer = gerar_parecer_historico_interno(
            {
                "score_interno": 88,
                "valor_aberto": 0,
                "valor_vencido": 0,
                "percentual_aberto_vencido": 0,
                "pontualidade_percentual": 95,
                "compras_12m": 50000,
            }
        )

        self.assertEqual(parecer["nivel"], "favoravel")
        self.assertIn("favoravel", parecer["titulo"].lower())

    def test_overdue_internal_history_requires_attention(self):
        parecer = gerar_parecer_historico_interno(
            {
                "score_interno": 35,
                "valor_aberto": 10000,
                "valor_vencido": 7000,
                "percentual_aberto_vencido": 70,
                "pontualidade_percentual": 40,
                "compras_12m": 20000,
            }
        )

        self.assertEqual(parecer["nivel"], "atencao")
        self.assertTrue(parecer["alertas"])


if __name__ == "__main__":
    unittest.main()
