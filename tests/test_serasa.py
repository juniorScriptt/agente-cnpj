import unittest

from services.serasa import calcular_limite_sugerido, calcular_risco_credito, gerar_analise_carteira
from app import _validar_cpf


class SerasaRulesTest(unittest.TestCase):
    def test_critical_status_blocks_credit(self):
        result = calcular_risco_credito(
            score_serasa=850,
            situacao_cadastral="INAPTA",
            restricoes=0,
            protestos=0,
            dividas_vencidas=0,
        )
        self.assertEqual(result["risk_level"], "critico")
        self.assertEqual(result["decision"], "Negar")

    def test_low_score_is_high_risk(self):
        result = calcular_risco_credito(
            score_serasa=250,
            situacao_cadastral="REGULAR",
            restricoes=0,
            protestos=0,
            dividas_vencidas=0,
        )
        self.assertEqual(result["risk_level"], "alto")

    def test_portfolio_summary_counts_risks(self):
        analysis = gerar_analise_carteira(
            [
                {"document": "1", "risk_level": "baixo", "recommended_limit": 1000, "score_serasa": 800, "score_anterior": 750},
                {"document": "2", "risk_level": "alto", "recommended_limit": 100, "score_serasa": 250, "score_anterior": 400, "restricoes_financeiras": 1},
            ]
        )
        self.assertEqual(analysis["summary"]["total_analisado"], 2)
        self.assertEqual(analysis["summary"]["baixo"], 1)
        self.assertEqual(analysis["summary"]["alto"], 1)
        self.assertEqual(analysis["summary"]["clientes_com_restricao"], 1)

    def test_critical_limit_is_zero(self):
        self.assertEqual(
            calcular_limite_sugerido(score_serasa=900, risk_level="critico", restrictions=0, overdue=0),
            0,
        )

    def test_cpf_validation(self):
        self.assertTrue(_validar_cpf("633.923.802-53"))
        self.assertFalse(_validar_cpf("633.923.802-54"))
        self.assertFalse(_validar_cpf("111.111.111-11"))


if __name__ == "__main__":
    unittest.main()
