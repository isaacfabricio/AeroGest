"""
Agente OptimizerAgent para otimização quântica de alocação de aeronaves.

Este agente utiliza o CodeGeneratorAgent para gerar circuitos QAOA e simula o envio da solução otimizada
para o backend via API REST.

Funcionalidades:
- Geração de circuitos QAOA para otimização.
- Envio da solução otimizada para API backend.
- Tratamento de erros na comunicação com a API.

Exemplo de uso:
    agent = OptimizerAgent()
    result = agent.optimize({"num_aircraft": 3})
    print(result)
"""

from code_generator import CodeGeneratorAgent
import requests

class OptimizerAgent:
    def __init__(self):
        self.code_agent = CodeGeneratorAgent()
        self.api_endpoint = "http://localhost:8080/api/reservations/optimize"

    def optimize(self, data):
        """
        Realiza otimização quântica para alocação de aeronaves.

        Parâmetros:
        - data: dicionário com dados da otimização, ex: {"num_aircraft": 3}

        Retorna:
        - resposta da API backend com a solução otimizada ou None em caso de erro.
        """
        task = f"QAOA para {data['num_aircraft']} aeronaves"
        circuit = self.code_agent.generate_circuit(task)
        # Simulação de solução otimizada
        solution = {"aircraft_1": "slot_1", "aircraft_2": "slot_2", "aircraft_3": "slot_3"}
        try:
            response = requests.post(self.api_endpoint, json=solution)
            response.raise_for_status()
            print("Otimização realizada com sucesso:", response.json())
            return response.json()
        except requests.exceptions.RequestException as e:
            print("Erro na requisição:", e)
            return None

if __name__ == "__main__":
    agent = OptimizerAgent()
    result = agent.optimize({"num_aircraft": 3})
    print(result)
