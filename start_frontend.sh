#!/bin/bash
# Script para abrir o frontend no navegador padrão

FRONTEND_PATH="quantum/frontend_example.html"

if [ ! -f "$FRONTEND_PATH" ]; then
  echo "Arquivo frontend_example.html não encontrado em quantum/"
  exit 1
fi

# Detecta sistema operacional para abrir o arquivo no navegador padrão
if [[ "$OSTYPE" == "linux-gnu"* ]]; then
  xdg-open "$FRONTEND_PATH"
elif [[ "$OSTYPE" == "darwin"* ]]; then
  open "$FRONTEND_PATH"
elif [[ "$OSTYPE" == "cygwin" || "$OSTYPE" == "msys" ]]; then
  start "" "$FRONTEND_PATH"
else
  echo "Sistema operacional não suportado para abrir o frontend automaticamente."
  exit 1
fi
