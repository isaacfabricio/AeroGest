#!/bin/bash
# Script simples para iniciar um servidor HTTP local na porta 3000 para servir a interface AeroGest

# Verifica se o Python 3 está instalado
if ! command -v python3 &> /dev/null
then
    echo "Python 3 não encontrado. Por favor, instale o Python 3 para usar este script."
    exit 1
fi

# Inicia o servidor HTTP na porta 3000 servindo o diretório prisma
echo "Iniciando servidor HTTP em http://127.0.0.1:3000/"
cd prisma
python3 -m http.server 3000
