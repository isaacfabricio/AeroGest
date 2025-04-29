#!/bin/bash
# Script para rodar backend e frontend simultaneamente

# Inicia o backend
echo "Iniciando backend..."
cd AeroGest/sistema-unificado/backend
npm run dev &
BACKEND_PID=$!

# Inicia o frontend
echo "Iniciando frontend..."
cd ../../AeroGest/sistema-gerenciamento-voos-frontend
npm run dev &
FRONTEND_PID=$!

# Espera os processos terminarem
wait $BACKEND_PID
wait $FRONTEND_PID
