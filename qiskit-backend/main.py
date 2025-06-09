from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from .database import SessionLocal
from .models import Flight, Passenger, Aircraft
from pydantic import BaseModel

app = FastAPI()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# --- MODELOS Pydantic ---
class FlightCreate(BaseModel):
    code: str
    origin: str
    destination: str

class PassengerCreate(BaseModel):
    name: str
    document: str

class AircraftCreate(BaseModel):
    model: str
    registration: str

# --- CRUD FLIGHTS ---
@app.get("/flights")
def list_flights(db: Session = Depends(get_db)):
    return db.query(Flight).all()

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
    return db_flight

@app.put("/flights/{fid}")
def update_flight(fid: int, flight: FlightCreate, db: Session = Depends(get_db)):
    db_flight = db.query(Flight).filter(Flight.id == fid).first()
    if not db_flight:
        raise HTTPException(status_code=404)
    db_flight.code = flight.code
    db_flight.origin = flight.origin
    db_flight.destination = flight.destination
    db.commit()
    db.refresh(db_flight)
    return db_flight

@app.delete("/flights/{fid}")
def delete_flight(fid: int, db: Session = Depends(get_db)):
    db_flight = db.query(Flight).filter(Flight.id == fid).first()
    if not db_flight:
        raise HTTPException(status_code=404)
    db.delete(db_flight)
    db.commit()
    return {"detail": "deleted"}

# --- CRUD PASSENGERS ---
@app.get("/passengers")
def list_passengers(db: Session = Depends(get_db)):
    return db.query(Passenger).all()

@app.post("/passengers")
def create_passenger(p: PassengerCreate, db: Session = Depends(get_db)):
    passenger = Passenger(**p.dict())
    db.add(passenger)
    db.commit()
    db.refresh(passenger)
    return passenger

@app.put("/passengers/{pid}")
def update_passenger(pid: int, p: PassengerCreate, db: Session = Depends(get_db)):
    passenger = db.query(Passenger).filter(Passenger.id == pid).first()
    if not passenger:
        raise HTTPException(status_code=404)
    passenger.name = p.name
    passenger.document = p.document
    db.commit()
    db.refresh(passenger)
    return passenger

@app.delete("/passengers/{pid}")
def delete_passenger(pid: int, db: Session = Depends(get_db)):
    passenger = db.query(Passenger).filter(Passenger.id == pid).first()
    if not passenger:
        raise HTTPException(status_code=404)
    db.delete(passenger)
    db.commit()
    return {"detail": "deleted"}

# --- CRUD AIRCRAFTS ---
@app.get("/aircrafts")
def list_aircrafts(db: Session = Depends(get_db)):
    return db.query(Aircraft).all()

@app.post("/aircrafts")
def create_aircraft(a: AircraftCreate, db: Session = Depends(get_db)):
    aircraft = Aircraft(**a.dict())
    db.add(aircraft)
    db.commit()
    db.refresh(aircraft)
    return aircraft

@app.put("/aircrafts/{aid}")
def update_aircraft(aid: int, a: AircraftCreate, db: Session = Depends(get_db)):
    aircraft = db.query(Aircraft).filter(Aircraft.id == aid).first()
    if not aircraft:
        raise HTTPException(status_code=404)
    aircraft.model = a.model
    aircraft.registration = a.registration
    db.commit()
    db.refresh(aircraft)
    return aircraft

@app.delete("/aircrafts/{aid}")
def delete_aircraft(aid: int, db: Session = Depends(get_db)):
    aircraft = db.query(Aircraft).filter(Aircraft.id == aid).first()
    if not aircraft:
        raise HTTPException(status_code=404)
    db.delete(aircraft)
    db.commit()
    return {"detail": "deleted"}

# --- HEALTH CHECK ---
@app.get("/health")
async def health():
    return {"status": "ok"}
