try:
    from qiskit import IBMQ, transpile, assemble
    from qiskit.providers.ibmq import least_busy
    print("Importação do Qiskit bem-sucedida!")
except ImportError as e:
    print(f"Erro na importação do Qiskit: {e}")
