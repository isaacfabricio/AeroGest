import unittest
from unittest.mock import patch, MagicMock
from quantum.agents.api_tester import APITesterAgent

class TestAPITesterAgent(unittest.TestCase):
    def setUp(self):
        self.agent = APITesterAgent()

    @patch('quantum.agents.api_tester.requests.post')
    def test_test_api_success(self, mock_post):
        mock_response = MagicMock()
        mock_response.json.return_value = {"status": "ok"}
        mock_response.raise_for_status.return_value = None
        mock_post.return_value = mock_response

        data = {"aircraft_1": "slot_1"}
        result = self.agent.test_api(data)
        self.assertEqual(result, {"status": "ok"})
        mock_post.assert_called_once()

    @patch('quantum.agents.api_tester.requests.post')
    def test_test_api_failure(self, mock_post):
        mock_post.side_effect = Exception("API error")

        data = {"aircraft_1": "slot_1"}
        result = self.agent.test_api(data)
        self.assertIsNone(result)

if __name__ == "__main__":
    unittest.main()
