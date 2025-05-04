#!/bin/bash
# Script para automatizar ativação do ambiente, configuração do token e execução do backend

# Verifica se o ambiente virtual existe
if [ ! -d "qiskit-env-py39" ]; then
  echo "Ambiente virtual não encontrado. Criando ambiente..."
  python3.9 -m venv qiskit-env-py39
fi

# Ativa o ambiente virtual
source qiskit-env-py39/bin/activate

# Atualiza pip e instala dependências se necessário
pip install --upgrade pip
pip install -r requirements.txt

# Verifica se o arquivo .env existe e carrega as variáveis
if [ -f "quantum/.env" ]; then
  export $(grep -v '^#' quantum/.env | xargs)
else
  echo "Arquivo quantum/.env não encontrado. Por favor, crie e defina IBMQ_TOKEN."
  exit 1
fi

# Executa o backend FastAPI
uvicorn quantum.backend_api:app --host 0.0.0.0 --port 8000 --reload
