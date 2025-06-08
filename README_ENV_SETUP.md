# Guia para Configuração e Execução do Ambiente com Qiskit

Este guia descreve o processo correto para ativar o ambiente Python 3.9, instalar dependências e executar o backend do projeto AeroGest com Qiskit.

## Passos para Configuração

1. **Verifique se o Python 3.9 está instalado:**

```bash
python3.9 --version
```

Se não estiver instalado, instale o Python 3.9 conforme seu sistema operacional.

1. **Crie e ative o ambiente virtual:**

```bash
python3.9 -m venv qiskit-env-py39
source qiskit-env-py39/bin/activate
```

1. **Atualize o pip e instale as dependências:**

```bash
pip install --upgrade pip
pip install qiskit==0.43.2 qiskit-algorithms==0.2.0 qiskit-optimization==0.5.0 fastapi uvicorn requests langchain matplotlib python-dotenv
```

1. **Configure a variável de ambiente do token IBMQ:**

No Linux/macOS:

```bash
export IBMQ_TOKEN="seu_token_aqui"
```

No Windows PowerShell:

```powershell
setx IBMQ_TOKEN "seu_token_aqui"
```

Ou crie o arquivo `.env` na pasta `quantum` com:

```env
IBMQ_TOKEN=seu_token_aqui
```

1. **Execute o backend:**

```bash
uvicorn quantum.backend_api:app --host 0.0.0.0 --port 8000 --reload
```

## Uso do Script de Setup

Você pode usar o script `setup_py39_env.sh` para automatizar os passos acima:

```bash
./setup_py39_env.sh
```

Este script cria o ambiente, instala as dependências e executa o backend.

## Observações

- Sempre ative o ambiente virtual antes de rodar o backend para garantir que o Qiskit e outras dependências estejam disponíveis.
- Se alterar o token IBMQ, atualize a variável de ambiente ou o arquivo `.env` e reinicie o backend.
- Para desenvolvimento, use o modo `--reload` do uvicorn para recarregar automaticamente as mudanças.

Se precisar de ajuda adicional, estou à disposição.
