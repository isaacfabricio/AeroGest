import { useEffect, useState } from "react";
import FlightForm from "../components/FlightForm";

export default function Home() {
  const [flights, setFlights] = useState([]);

  const fetchFlights = () => {
    fetch("http://localhost:8000/flights")
      .then((res) => res.json())
      .then((data) => setFlights(data));
  };  import { useState } from "react";
  
  export default function FlightForm({ onFlightAdded }) {
    const [code, setCode] = useState("");
    const [origin, setOrigin] = useState("");
    const [destination, setDestination] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      setError("");
      try {
        const res = await fetch("http://localhost:8000/flights", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ code, origin, destination }),
        });
        if (!res.ok) throw new Error("Erro ao cadastrar voo");
        setCode("");
        setOrigin("");
        setDestination("");
        if (onFlightAdded) onFlightAdded();
      } catch (err) {
        setError(err.message);
      }
      setLoading(false);
    };
  
    return (
      <form onSubmit={handleSubmit} style={{ marginBottom: 24 }}>
        <h2>Cadastrar novo voo</h2>
        <div>
          <label>Código: </label>
          <input value={code} onChange={e => setCode(e.target.value)} required />
        </div>
        <div>
          <label>Origem: </label>
          <input value={origin} onChange={e => setOrigin(e.target.value)} required />
        </div>
        <div>
          <label>Destino: </label>
          <input value={destination} onChange={e => setDestination(e.target.value)} required />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Salvando..." : "Cadastrar"}
        </button>
        {error && <div style={{ color: "red" }}>{error}</div>}
      </form>
    );
  }

  useEffect(() => {
    fetchFlights();
  }, []);

  return (
    <div>
      <h1>Lista de Voos</h1>
      <FlightForm onFlightAdded={fetchFlights} />
      <ul>
        {flights.map((flight) => (
          <li key={flight.id}>
            {flight.code} - {flight.origin} → {flight.destination}
          </li>
        ))}
      </ul>
    </div>
  );
}import { useCallback, useEffect, useState } from 'react'
import Button from '../components/Button'
import ClickCount from '../components/ClickCount'
import styles from '../styles/home.module.css'

function throwError() {
  console.log(
    // The function body() is not defined
    document.body()
  )
}

function Home() {
  const [count, setCount] = useState(0)
  const increment = useCallback(() => {
    setCount((v) => v + 1)
  }, [setCount])

  useEffect(() => {
    const r = setInterval(() => {
      increment()
    }, 1000)

    return () => {
      clearInterval(r)
    }
  }, [increment])

  return (
    <main className={styles.main}>
      <h1>Fast Refresh Demo</h1>
      <p>
        Fast Refresh is a Next.js feature that gives you instantaneous feedback
        on edits made to your React components, without ever losing component
        state.
      </p>
      <hr className={styles.hr} />
      <div>
        <p>
          Auto incrementing value. The counter won't reset after edits or if
          there are errors.
        </p>
        <p>Current value: {count}</p>
      </div>
      <hr className={styles.hr} />
      <div>
        <p>Component with state.</p>
        <ClickCount />
      </div>
      <hr className={styles.hr} />
      <div>
        <p>
          The button below will throw 2 errors. You'll see the error overlay to
          let you know about the errors but it won't break the page or reset
          your state.
        </p>
        <Button
          onClick={(e) => {
            setTimeout(() => document.parentNode(), 0)
            throwError()
          }}
        >
          Throw an Error
        </Button>
      </div>
      <hr className={styles.hr} />
    </main>
  )
}

export default Home
