import unittest
from quantum.agents.code_generator import CodeGeneratorAgent

class TestCodeGeneratorAgent(unittest.TestCase):
    def setUp(self):
        self.agent = CodeGeneratorAgent()

    def test_generate_circuit_qaoa(self):
        task = "QAOA para otimização"
        result = self.agent.generate_circuit(task)
        self.assertIsNotNone(result)
        self.assertTrue(hasattr(result, 'fval'))  # Check if result has optimization value attribute

    def test_generate_circuit_unsupported(self):
        task = "Circuito desconhecido"
        result = self.agent.generate_circuit(task)
        self.assertIsNone(result)

if __name__ == "__main__":
    unittest.main()
