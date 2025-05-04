"""
Script orquestrador para executar os agentes de IA do projeto AeroGest em sequência.

Fluxo:
1. Gera circuito quântico com CodeGeneratorAgent.
2. Executa otimização com OptimizerAgent.
3. Testa API com APITesterAgent.
4. Gera documentação com DocGeneratorAgent.

Este script facilita a execução integrada dos agentes para automação e otimização.
"""

from quantum.agents.code_generator import CodeGeneratorAgent
from quantum.agents.optimizer_agent import OptimizerAgent
from quantum.agents.api_tester import APITesterAgent
from quantum.agents.doc_generator import DocGeneratorAgent

def main():
    print("Iniciando orquestração dos agentes de IA AeroGest...")

    # 1. Gerar circuito quântico
    code_agent = CodeGeneratorAgent()
    task = "Implementar QAOA para otimizar alocação de 3 aeronaves"
    print(f"Gerando circuito para tarefa: {task}")
    circuit_result = code_agent.generate_circuit(task)
    if circuit_result:
        code_agent.save_circuit(circuit_result)
    else:
        print("Falha na geração do circuito.")

    # 2. Otimização
    optimizer_agent = OptimizerAgent()
    optimization_data = {"num_aircraft": 3}
    print("Executando otimização quântica...")
    optimization_result = optimizer_agent.optimize(optimization_data)
    if optimization_result:
        print("Otimização concluída:", optimization_result)
    else:
        print("Falha na otimização.")

    # 3. Teste da API
    api_tester = APITesterAgent()
    print("Testando API com dados otimizados...")
    api_test_result = api_tester.test_api(optimization_result if optimization_result else {})
    if api_test_result:
        print("Teste da API bem-sucedido.")
    else:
        print("Falha no teste da API.")

    # 4. Geração de documentação
    doc_agent = DocGeneratorAgent()
    print("Gerando documentação dos agentes...")
    doc_agent.generate("code_generator")
    summary = doc_agent.generate_summary()
    print(summary)

if __name__ == "__main__":
    main()
