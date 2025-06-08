from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from .database import SessionLocal
from .models import Flight
from pydantic import BaseModel

class FlightCreate(BaseModel):
    code: str
    origin: str
    destination: str

@app.post("/flights")
def create_flight(flight: FlightCreate, db: Session = Depends(get_db)):
    db_flight = Flight(code=flight.code, origin=flight.origin, destination=flight.destination)
    db.add(db_flight)
    try:
        db.commit()
        db.refresh(db_flight)
    except Exception:
        db.rollback()
        raise HTTPException(status_code=400, detail="Erro ao cadastrar voo (código duplicado?)")
    return db_flightfrom fastapi import FastAPI, Query, HTTPException, Header, Depends
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from qiskit import QuantumCircuit, transpile
from qiskit_aer import AerSimulator
from qiskit.providers.ibmq import least_busy
import io
import logging
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

app = FastAPI()


# Setup logger
logger = logging.getLogger("qiskit-backend")
logger.setLevel(logging.INFO)
handler = logging.StreamHandler()
formatter = logging.Formatter("%(asctime)s - %(levelname)s - %(message)s")
handler.setFormatter(formatter)
logger.addHandler(handler)

security = HTTPBearer()

class CircuitResult(BaseModel):
    counts: dict

class CircuitHistoryItem(BaseModel):
    id: int
    counts: dict
    shots: int
    simulator_name: str

history = []
next_id = 1

def verify_token(credentials: HTTPAuthorizationCredentials = Depends(security)):
    token = credentials.credentials
    # Here you can add token validation logic, e.g., check against a database or environment variable
    if not token or token != "expected_token_value":
        logger.warning("Unauthorized access attempt with token: %s", token)
        raise HTTPException(status_code=401, detail="Invalid or missing token")
    return token

@app.get("/health")
async def health():
    logger.info("Health check requested")
    return {"status": "ok"}

@app.get("/run-circuit", response_model=CircuitResult)
async def run_circuit(
    shots: int = Query(1000, ge=1, le=10000),
    simulator_name: str = Query("aer_simulator"),
    ibmq_token: str = Header(None),
    token: str = Depends(verify_token)
):
    global next_id
    logger.info(f"Run circuit requested with shots={shots}, simulator={simulator_name}, ibmq_token={'provided' if ibmq_token else 'not provided'}")
    qc = QuantumCircuit(2, 2)
    qc.h(0)
    qc.cx(0, 1)
    qc.measure([0, 1], [0, 1])

    if ibmq_token:
        try:
            from qiskit import IBMQ
            IBMQ.disable_account()
            IBMQ.enable_account(ibmq_token)
            provider = IBMQ.get_provider(hub='ibm-q')
            # Support multiple backends: filter for simulators and real devices
            backends = provider.backends(filters=lambda b: b.configuration().n_qubits >= 2 and b.status().operational==True)
            if simulator_name == "aer_simulator":
                backend = AerSimulator()
            else:
                backend = None
                for b in backends:
                    if b.name() == simulator_name:
                        backend = b
                        break
                if backend is None:
                    raise HTTPException(status_code=400, detail="Unsupported simulator or backend")
            if isinstance(backend, AerSimulator):
                result = backend.run(qc, shots=shots).result()
            else:
                transpiled_qc = transpile(qc, backend=backend)
                job = backend.run(transpiled_qc, shots=shots)
                logger.info(f"Job submitted to IBM Quantum backend {backend.name()}")
                result = job.result(timeout=120)
            counts = result.get_counts()
            simulator_name = backend.name() if not isinstance(backend, AerSimulator) else "aer_simulator"
            logger.info(f"Job completed on backend {simulator_name}")
        except Exception as e:
            logger.error(f"IBM Quantum error: {str(e)}")
            raise HTTPException(status_code=400, detail=f"IBM Quantum error: {str(e)}")
    elif simulator_name == "aer_simulator":
        simulator = AerSimulator()
        result = simulator.run(qc, shots=shots).result()
        counts = result.get_counts()
        logger.info("Job completed on AerSimulator")
    else:
        logger.error("Unsupported simulator requested")
        raise HTTPException(status_code=400, detail="Unsupported simulator")

    # Save to history
    history.append(CircuitHistoryItem(id=next_id, counts=counts, shots=shots, simulator_name=simulator_name))
    next_id += 1

    return CircuitResult(counts=counts)

@app.get("/circuit-visualization")
async def circuit_visualization():
    logger.info("Circuit visualization requested")
    qc = QuantumCircuit(2, 2)
    qc.h(0)
    qc.cx(0, 1)
    qc.measure([0, 1], [0, 1])

    img = qc.draw(output='mpl')
    buf = io.BytesIO()
    img.savefig(buf, format='png')
    buf.seek(0)
    return StreamingResponse(buf, media_type="image/png")

@app.get("/history")
async def get_history():
    logger.info("History requested")
    return history

@app.delete("/history/{item_id}")
async def delete_history_item(item_id: int):
    global history
    history = [item for item in history if item.id != item_id]
    logger.info(f"Deleted history item with id {item_id}")
    return {"message": "Deleted"}
