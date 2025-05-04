from fastapi import FastAPI
from pydantic import BaseModel
from quantum.ibmq_integration import IBMQIntegration
from quantum.ibmq_setup import setup_ibmq_account
from qiskit.circuit import QuantumCircuit
from dotenv import load_dotenv
import os

load_dotenv(dotenv_path="quantum/.env")

app = FastAPI()
ibmq = None

class CircuitRequest(BaseModel):
    circuit_data: dict  # You can define a more specific schema as needed

@app.on_event("startup")
def startup_event():
    global ibmq
    # Setup IBMQ account before initializing IBMQIntegration
    token = os.getenv("IBMQ_TOKEN")
    setup_ibmq_account(token)
    ibmq = IBMQIntegration()

@app.post("/run_circuit/")
def run_circuit(request: CircuitRequest):
    # For simplicity, create a QuantumCircuit from request data
    # Here we expect circuit_data to be a dict describing the circuit
    # This is a placeholder: in practice, you need to parse and build the circuit properly
    qc = QuantumCircuit(2)
    qc.h(0)
    qc.cx(0, 1)
    qc.measure_all()

    counts = ibmq.run_circuit(qc)
    return {"counts": counts}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
