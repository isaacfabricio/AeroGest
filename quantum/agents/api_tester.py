"""
Agente APITesterAgent para testar endpoints da API backend.

Este agente envia dados gerados por IA para validar endpoints RESTful,
verificando respostas e tratamento de erros.

Funcionalidades:
- Envio de requisições POST para API.
- Tratamento de exceções e logs de sucesso ou falha.
- Exemplo de uso com dados simulados.

Exemplo de uso:
    agent = APITesterAgent()
    data = {"aircraft_1": "slot_1", "aircraft_2": "slot_2", "aircraft_3": "slot_3"}
    agent.test_api(data)
"""

import requests
import random

class APITesterAgent:
    def __init__(self, api_url="http://localhost:8080/api/reservations/optimize"):
        self.api_url = api_url

    def test_api(self, data):
        """
        Testa o endpoint da API enviando dados JSON.

        Parâmetros:
        - data: dicionário com dados para envio.

        Retorna:
        - resposta JSON da API ou None em caso de erro.
        """
        try:
            response = requests.post(self.api_url, json=data)
            response.raise_for_status()
            print("API testada com sucesso:", response.json())
            return response.json()
        except requests.exceptions.RequestException as e:
            print("Erro no teste da API:", e)
            return None

if __name__ == "__main__":
    agent = APITesterAgent()
    data = {"aircraft_1": "slot_1", "aircraft_2": "slot_2", "aircraft_3": "slot_3"}
    agent.test_api(data)
