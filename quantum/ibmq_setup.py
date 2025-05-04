from qiskit import IBMQ

def setup_ibmq_account(token=None):
    if token is None:
        # Token fixo conforme solicitado
        token = "deb349f6ee1ce49d65ba7dd61c167b1d6d66e1cdb6c64102dea91ceb282c8542e98b61b792307fd894f7108375a8704212c48114fc231bf24bf5f6ebd6ae08e9"
    IBMQ.save_account(token, overwrite=True)
    IBMQ.load_account()
    print("Conta IBMQ configurada com sucesso.")

if __name__ == "__main__":
    setup_ibmq_account()
