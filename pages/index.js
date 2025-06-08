import { useEffect, useState } from "react";

// --- Consulta de clima para o destino ---
function WeatherInfo({ destination }) {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!destination) return;
    setLoading(true);
    // Exemplo: latitude/longitude de São Paulo. Substitua conforme necessário.
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=-23.55&longitude=-46.63&current_weather=true`)
      .then(res => res.json())
      .then(data => {
        setWeather(data.current_weather);
        setLoading(false);
      });
  }, [destination]);

  if (!destination) return null;
  if (loading) return <p>Carregando clima para {destination}...</p>;
  if (!weather) return <p>Clima não disponível.</p>;

  return (
    <div>
      <strong>Clima em {destination}:</strong> {weather.temperature}°C, código: {weather.weathercode}
    </div>
  );
}

// --- Formulário genérico para cadastro/edição ---
function GenericForm({ title, fields, initialData, onSubmit, onCancel }) {
  const [form, setForm] = useState(initialData || {});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setForm(initialData || {});
  }, [initialData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await onSubmit(form);
    setLoading(false);
    setForm({});
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 24 }}>
      <h2>{title}</h2>
      {fields.map(f => (
        <div key={f.name}>
          <label>{f.label}: </label>
          <input
            name={f.name}
            value={form[f.name] || ""}
            onChange={handleChange}
            required={f.required}
          />
        </div>
      ))}
      <button type="submit" disabled={loading}>
        {loading ? "Salvando..." : (initialData ? "Salvar edição" : "Cadastrar")}
      </button>
      {onCancel && (
        <button type="button" onClick={onCancel} style={{ marginLeft: 8 }}>
          Cancelar
        </button>
      )}
    </form>
  );
}

// --- Histórico de ações ---
function History({ history }) {
  if (history.length === 0) return null;
  return (
    <div style={{ marginTop: 32 }}>
      <h2>Histórico de ações</h2>
      <ul>
        {history.map((item, idx) => (
          <li key={idx}>
            [{item.time}] {item.action} {item.entity} {item.name}
            {item.details && <> ({item.details})</>}
          </li>
        ))}
      </ul>
    </div>
  );
}

// --- Página principal ---
export default function Home() {
  // Voos
  const [flights, setFlights] = useState([]);
  const [editingFlight, setEditingFlight] = useState(null);
  const [selectedDestination, setSelectedDestination] = useState("");

  // Passageiros e aeronaves (simulados em memória)
  const [passengers, setPassengers] = useState([]);
  const [editingPassenger, setEditingPassenger] = useState(null);
  const [aircrafts, setAircrafts] = useState([]);
  const [editingAircraft, setEditingAircraft] = useState(null);

  // Histórico
  const [history, setHistory] = useState([]);

  // --- Funções de voo (backend) ---
  const fetchFlights = () => {
    fetch("http://localhost:8000/flights")
      .then((res) => res.json())
      .then((data) => setFlights(data));
  };

  useEffect(() => {
    fetchFlights();
  }, []);

  const addHistory = (action, entity, name, details = "") => {
    setHistory((h) => [
      ...h,
      {
        time: new Date().toLocaleTimeString(),
        action,
        entity,
        name,
        details,
      },
    ]);
  };

  const handleAddFlight = async (flight) => {
    const res = await fetch("http://localhost:8000/flights", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(flight),
    });
    if (!res.ok) throw new Error("Erro ao cadastrar voo");
    fetchFlights();
    addHistory("Cadastrado", "voo", flight.code);
  };

  const handleEditFlight = async (flight) => {
    const res = await fetch(`http://localhost:8000/flights/${editingFlight.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(flight),
    });
    if (!res.ok) throw new Error("Erro ao editar voo");
    fetchFlights();
    addHistory("Editado", "voo", flight.code);
    setEditingFlight(null);
  };

  const handleDeleteFlight = async (flight) => {
    if (!window.confirm(`Deseja excluir o voo ${flight.code}?`)) return;
    const res = await fetch(`http://localhost:8000/flights/${flight.id}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Erro ao excluir voo");
    fetchFlights();
    addHistory("Excluído", "voo", flight.code);
  };

  // --- Passageiros (em memória) ---
  const handleAddPassenger = async (p) => {
    setPassengers((prev) => [...prev, { ...p, id: Date.now() }]);
    addHistory("Cadastrado", "passageiro", p.name);
  };
  const handleEditPassenger = async (p) => {
    setPassengers((prev) =>
      prev.map((item) => (item.id === editingPassenger.id ? { ...item, ...p } : item))
    );
    addHistory("Editado", "passageiro", p.name);
    setEditingPassenger(null);
  };
  const handleDeletePassenger = async (p) => {
    if (!window.confirm(`Deseja excluir o passageiro ${p.name}?`)) return;
    setPassengers((prev) => prev.filter((item) => item.id !== p.id));
    addHistory("Excluído", "passageiro", p.name);
  };

  // --- Aeronaves (em memória) ---
  const handleAddAircraft = async (a) => {
    setAircrafts((prev) => [...prev, { ...a, id: Date.now() }]);
    addHistory("Cadastrado", "aeronave", a.model);
  };
  const handleEditAircraft = async (a) => {
    setAircrafts((prev) =>
      prev.map((item) => (item.id === editingAircraft.id ? { ...item, ...a } : item))
    );
    addHistory("Editado", "aeronave", a.model);
    setEditingAircraft(null);
  };
  const handleDeleteAircraft = async (a) => {
    if (!window.confirm(`Deseja excluir a aeronave ${a.model}?`)) return;
    setAircrafts((prev) => prev.filter((item) => item.id !== a.id));
    addHistory("Excluído", "aeronave", a.model);
  };

  return (
    <div style={{ maxWidth: 700, margin: "auto" }}>
      <h1>Gestão de Voos, Passageiros e Aeronaves</h1>

      {/* Voos */}
      <GenericForm
        title={editingFlight ? "Editar voo" : "Cadastrar novo voo"}
        fields={[
          { name: "code", label: "Código", required: true },
          { name: "origin", label: "Origem", required: true },
          { name: "destination", label: "Destino", required: true },
        ]}
        initialData={editingFlight}
        onSubmit={editingFlight ? handleEditFlight : handleAddFlight}
        onCancel={editingFlight ? () => setEditingFlight(null) : undefined}
      />
      <h2>Lista de Voos</h2>
      <ul>
        {flights.map((flight) => (
          <li key={flight.id}>
            {flight.code} - {flight.origin} → {flight.destination}{" "}
            <button onClick={() => setSelectedDestination(flight.destination)}>
              Ver clima
            </button>
            <button onClick={() => setEditingFlight(flight)} style={{ marginLeft: 8 }}>
              Editar
            </button>
            <button onClick={() => handleDeleteFlight(flight)} style={{ marginLeft: 8, color: "red" }}>
              Excluir
            </button>
          </li>
        ))}
      </ul>
      <WeatherInfo destination={selectedDestination} />

      {/* Passageiros */}
      <GenericForm
        title={editingPassenger ? "Editar passageiro" : "Cadastrar passageiro"}
        fields={[
          { name: "name", label: "Nome", required: true },
          { name: "document", label: "Documento", required: true },
        ]}
        initialData={editingPassenger}
        onSubmit={editingPassenger ? handleEditPassenger : handleAddPassenger}
        onCancel={editingPassenger ? () => setEditingPassenger(null) : undefined}
      />
      <h2>Passageiros</h2>
      <ul>
        {passengers.map((p) => (
          <li key={p.id}>
            {p.name} (Doc: {p.document})
            <button onClick={() => setEditingPassenger(p)} style={{ marginLeft: 8 }}>
              Editar
            </button>
            <button onClick={() => handleDeletePassenger(p)} style={{ marginLeft: 8, color: "red" }}>
              Excluir
            </button>
          </li>
        ))}
      </ul>

      {/* Aeronaves */}
      <GenericForm
        title={editingAircraft ? "Editar aeronave" : "Cadastrar aeronave"}
        fields={[
          { name: "model", label: "Modelo", required: true },
          { name: "registration", label: "Matrícula", required: true },
        ]}
        initialData={editingAircraft}
        onSubmit={editingAircraft ? handleEditAircraft : handleAddAircraft}
        onCancel={editingAircraft ? () => setEditingAircraft(null) : undefined}
      />
      <h2>Aeronaves</h2>
      <ul>
        {aircrafts.map((a) => (
          <li key={a.id}>
            {a.model} (Matrícula: {a.registration})
            <button onClick={() => setEditingAircraft(a)} style={{ marginLeft: 8 }}>
              Editar
            </button>
            <button onClick={() => handleDeleteAircraft(a)} style={{ marginLeft: 8, color: "red" }}>
              Excluir
            </button>
          </li>
        ))}
      </ul>

      <History history={history} />
    </div>
  );
}