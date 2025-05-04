import pytest
from fastapi.testclient import TestClient
from qiskit_backend.main import app

client = TestClient(app)

def test_run_circuit_default():
    response = client.get("/run-circuit")
    assert response.status_code == 200
    data = response.json()
    assert "counts" in data
    assert isinstance(data["counts"], dict)

def test_run_circuit_with_params():
    response = client.get("/run-circuit?shots=500&simulator_name=aer_simulator")
    assert response.status_code == 200
    data = response.json()
    assert "counts" in data
    assert isinstance(data["counts"], dict)

def test_run_circuit_invalid_simulator():
    response = client.get("/run-circuit?simulator_name=invalid_sim")
    assert response.status_code == 400

def test_circuit_visualization():
    response = client.get("/circuit-visualization")
    assert response.status_code == 200
    assert response.headers["content-type"] == "image/png"

def test_history_crud():
    # Clear history first
    response = client.get("/history")
    initial_len = len(response.json())

    # Run circuit to add history
    client.get("/run-circuit")

    response = client.get("/history")
    assert response.status_code == 200
    assert len(response.json()) == initial_len + 1

    # Delete last item
    last_id = response.json()[-1]["id"]
    del_response = client.delete(f"/history/{last_id}")
    assert del_response.status_code == 200

    response_after_delete = client.get("/history")
    assert len(response_after_delete.json()) == initial_len
