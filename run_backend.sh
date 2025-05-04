#!/bin/bash
# Script para ativar o ambiente Python 3.9 e rodar o backend FastAPI

# Ativar o ambiente virtual qiskit-py39-env
source ./qiskit-py39-env/bin/activate

# Verificar ambiente ativo
echo "Ambiente virtual ativo: $VIRTUAL_ENV"
which python
python --version

# Rodar o backend FastAPI
uvicorn quantum.backend_api:app --host 0.0.0.0 --port 8000 --reload
