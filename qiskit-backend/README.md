# Qiskit Backend Service

Este serviço backend é uma API FastAPI para executar circuitos quânticos usando Qiskit.

## Endpoints

- `GET /run-circuit`: Executa um circuito quântico simples.
  - Parâmetros query:
    - `shots` (int): Número de tiros (padrão 1000).
    - `simulator_name` (string): Nome do simulador (ex: aer_simulator).
  - Header:
    - `ibmq-token` (string, opcional): Token IBM Quantum para executar em hardware real.
  - Retorna: Contagens do circuito.

- `GET /circuit-visualization`: Retorna uma imagem PNG do circuito quântico.

- `GET /history`: Retorna o histórico das execuções.

- `DELETE /history/{item_id}`: Deleta um item do histórico.

## Como rodar

1. Crie e ative um ambiente virtual Python.
2. Instale as dependências: `pip install -r requirements.txt`
3. Rode o servidor: `uvicorn main:app --reload --port 3002`

## Testes

Execute os testes com:

```bash
pytest test
```

## Configuração IBM Quantum

Para usar hardware real, obtenha seu token em https://quantum-computing.ibm.com e envie no header `ibmq-token`.
