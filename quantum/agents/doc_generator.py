"""
Agente DocGeneratorAgent para geração automática de documentação dos agentes de IA.

Funcionalidades:
- Geração de documentação HTML para módulos Python usando pydoc.
- Geração de resumo textual dos agentes implementados.
- Facilita a colaboração e manutenção do projeto.

Exemplo de uso:
    agent = DocGeneratorAgent()
    agent.generate("code_generator")
    summary = agent.generate_summary()
    print(summary)
"""

import pydoc
import sys
import os

sys.path.insert(0, os.path.abspath(os.path.dirname(__file__)))

class DocGeneratorAgent:
    def generate(self, module="code_generator"):
        """
        Gera documentação HTML para o módulo especificado.

        Parâmetros:
        - module: nome do módulo Python para gerar documentação (sem extensão .py).
        """
        pydoc.writedoc(module)
        print(f"Documentação gerada em {module}.html")

    def generate_summary(self):
        """
        Gera um resumo textual dos agentes de IA implementados.

        Retorna:
        - string com o resumo dos agentes.
        """
        docs = []
        docs.append("Documentação dos agentes de IA para otimização de alocação de aeronaves:")
        docs.append("- CodeGeneratorAgent: Gera circuitos quânticos usando QAOA.")
        docs.append("- OptimizerAgent: Envia dados para backend Java para otimização.")
        docs.append("- APITesterAgent: Testa endpoints da API para garantir funcionamento.")
        docs.append("- DocGeneratorAgent: Gera documentação automática dos agentes.")
        return "\n".join(docs)

if __name__ == "__main__":
    agent = DocGeneratorAgent()
    agent.generate()
    summary = agent.generate_summary()
    print(summary)
