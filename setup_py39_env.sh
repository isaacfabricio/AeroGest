#!/bin/bash
# Script para criar e configurar ambiente virtual Python 3.9 e instalar Qiskit 0.43.2

# Verifica se python3.9 está instalado
if ! command -v python3.9 &> /dev/null
then
    echo "Python 3.9 não encontrado. Por favor, instale o Python 3.9 antes de continuar."
    exit 1
fi

# Cria ambiente virtual
python3.9 -m venv qiskit-py39-env

# Ativa ambiente virtual
source qiskit-py39-env/bin/activate

# Atualiza pip
pip install --upgrade pip

# Instala Qiskit versão 0.43.2 compatível com Python 3.9
pip install qiskit==0.43.2

echo "Ambiente virtual Python 3.9 criado e Qiskit 0.43.2 instalado com sucesso."
echo "Para ativar o ambiente, execute: source qiskit-py39-env/bin/activate"
