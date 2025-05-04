import unittest
from unittest.mock import patch, MagicMock
from quantum.agents.optimizer_agent import OptimizerAgent

class TestOptimizerAgent(unittest.TestCase):
    def setUp(self):
        self.agent = OptimizerAgent()

    @patch('quantum.agents.optimizer_agent.requests.post')
    @patch('quantum.agents.optimizer_agent.CodeGeneratorAgent.generate_circuit')
    def test_optimize_success(self, mock_generate_circuit, mock_post):
        mock_generate_circuit.return_value = "mock_circuit"
        mock_response = MagicMock()
        mock_response.json.return_value = {"status": "success"}
        mock_response.raise_for_status.return_value = None
        mock_post.return_value = mock_response

        data = {"num_aircraft": 3}
        result = self.agent.optimize(data)
        self.assertEqual(result, {"status": "success"})
        mock_generate_circuit.assert_called_once()
        mock_post.assert_called_once()

    @patch('quantum.agents.optimizer_agent.requests.post')
    @patch('quantum.agents.optimizer_agent.CodeGeneratorAgent.generate_circuit')
    def test_optimize_api_failure(self, mock_generate_circuit, mock_post):
        mock_generate_circuit.return_value = "mock_circuit"
        mock_post.side_effect = Exception("API error")

        data = {"num_aircraft": 3}
        result = self.agent.optimize(data)
        self.assertIsNone(result)

if __name__ == "__main__":
    unittest.main()
