"""
Módulo IBMQIntegration para integração com IBM Quantum usando Qiskit.

Este módulo fornece uma classe para autenticação, execução e visualização de circuitos quânticos
em backends reais da IBM Quantum.

Funcionalidades:
- Autenticação segura via token IBMQ.
- Seleção automática do backend menos ocupado e operacional.
- Execução de circuitos com número configurável de shots.
- Visualização dos resultados com histogramas.
- Salvamento dos resultados em arquivo JSON.
- Tratamento robusto de exceções e logging detalhado.

Exemplo de uso:
    from quantum.ibmq_integration import IBMQIntegration
    ibmq = IBMQIntegration(token="SEU_TOKEN_AQUI")
    counts = ibmq.run_circuit(seu_circuito_quantico)
    ibmq.plot_results(counts)
    ibmq.save_results(counts, "resultados.json")
"""

import logging
import os
import json
import time
from typing import Dict, Any, Optional

try:
    from qiskit import IBMQ, transpile, assemble
    from qiskit.providers.ibmq import least_busy
    from qiskit.visualization import plot_histogram
    from qiskit.providers.ibmq.exceptions import IBMQAccountError
    from qiskit.providers.ibmq.job.exceptions import IBMQJobError
except ImportError as e:
    logging.error("Erro na importação do Qiskit: %s", e)
    raise

import matplotlib.pyplot as plt

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)

class IBMQIntegration:
    """
    Classe para integração com IBM Quantum.

    Métodos:
    - __init__(token=None): Inicializa a integração com token IBMQ.
    - run_circuit(circuit, shots=1024, max_retries=3, retry_delay=10): Executa circuito quântico.
    - plot_results(counts): Plota histograma dos resultados.
    - save_results(counts, filepath): Salva resultados em arquivo JSON.
    """
    def __init__(self, token: Optional[str] = None) -> None:
        if token is None:
            token = os.getenv("IBMQ_TOKEN")
        if not token:
            raise ValueError(
                "Token IBMQ não fornecido. Defina a variável de ambiente "
                "IBMQ_TOKEN ou passe o token diretamente."
            )
        try:
            IBMQ.save_account(token, overwrite=True)
            IBMQ.load_account()
            self.provider = IBMQ.get_provider(hub='ibm-q')
            logging.info("Conta IBMQ carregada com sucesso.")
        except IBMQAccountError as e:
            logging.error("Erro ao carregar conta IBMQ: %s", e)
            raise

    def run_circuit(
        self,
        circuit: Any,
        shots: int = 1024,
        max_retries: int = 3,
        retry_delay: int = 10
    ) -> Dict[str, int]:
        """
        Executa um circuito quântico no backend menos ocupado.

        Parâmetros:
        - circuit: circuito quântico a ser executado.
        - shots: número de execuções do circuito (padrão 1024).
        - max_retries: número máximo de tentativas em caso de falha.
        - retry_delay: tempo em segundos entre tentativas.

        Retorna:
        - counts: resultados da execução do circuito.
        """
        attempt = 0
        while attempt < max_retries:
            try:
                backend = least_busy(
                    self.provider.backends(
                        filters=lambda b: (
                            b.configuration().n_qubits >= circuit.num_qubits
                            and not b.configuration().simulator
                            and b.status().operational is True
                        )
                    )
                )
                logging.info("Executando no backend: %s", backend.name())
                
                transpiled = transpile(circuit, backend=backend)
                qobj = assemble(transpiled, shots=shots)
                job = backend.run(qobj)
                
                logging.info("Job ID: %s", job.job_id())
                result = job.result()
                counts = result.get_counts()
                logging.info("Resultados obtidos: %s", counts)
                return counts
                
            except IBMQJobError as e:
                attempt += 1
                logging.error(
                    "Erro ao executar circuito na tentativa %d: %s",
                    attempt,
                    e
                )
                if attempt < max_retries:
                    logging.info("Repetindo em %d segundos...", retry_delay)
                    time.sleep(retry_delay)
                else:
                    logging.error(
                        "Número máximo de tentativas atingido. "
                        "Falha na execução do circuito."
                    )
                    raise

    def plot_results(self, counts: Dict[str, int]) -> None:
        """
        Plota o histograma dos resultados da execução do circuito.

        Parâmetros:
        - counts: resultados da execução do circuito.
        """
        try:
            plot_histogram(counts)
            plt.show()
        except Exception as e:
            logging.error("Erro ao plotar resultados: %s", e)
            raise

    def save_results(self, counts: Dict[str, int], filepath: str) -> None:
        """
        Salva os resultados da execução do circuito em arquivo JSON.

        Parâmetros:
        - counts: resultados da execução do circuito.
        - filepath: caminho do arquivo para salvar os resultados.
        """
        try:
            with open(filepath, 'w', encoding='utf-8') as f:
                json.dump(counts, f)
            logging.info("Resultados salvos em %s", filepath)
        except Exception as e:
            logging.error("Erro ao salvar resultados: %s", e)
            raise

if __name__ == "__main__":
    from qiskit.circuit import QuantumCircuit

    # Exemplo simples de circuito
    qc = QuantumCircuit(2)
    qc.h(0)
    qc.cx(0, 1)
    qc.measure_all()

    ibmq = IBMQIntegration(token=os.getenv("IBMQ_TOKEN"))
    counts = ibmq.run_circuit(qc, shots=2048)
    print("Resultados:", counts)
    ibmq.plot_results(counts)
    ibmq.save_results(counts, "resultados.json")
