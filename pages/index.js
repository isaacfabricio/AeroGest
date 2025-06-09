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
}import { useEffect, useState } from "react";
import {
  Container, Card, CardContent, Typography, Button, Box, Grid, TextField, Snackbar, Alert, AppBar, Toolbar, IconButton, Tabs, Tab
} from "@mui/material";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CloudIcon from "@mui/icons-material/Cloud";
import PeopleIcon from "@mui/icons-material/People";
import AirplanemodeActiveIcon from "@mui/icons-material/AirplanemodeActive";

function WeatherInfo({ destination }) {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!destination) return;
    setLoading(true);
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=-23.55&longitude=-46.63&current_weather=true`)
      .then(res => res.json())
      .then(data => {
        setWeather(data.current_weather);
        setLoading(false);
      });
  }, [destination]);

  if (!destination) return null;
  if (loading) return <Typography color="primary">Carregando clima para {destination}...</Typography>;
  if (!weather) return <Typography color="error">Clima não disponível.</Typography>;

  return (
    <Box mt={2} mb={2}>
      <Alert icon={<CloudIcon />} severity="info">
        <strong>Clima em {destination}:</strong> {weather.temperature}°C, código: {weather.weathercode}
      </Alert>
    </Box>
  );
}

function GenericForm({ title, fields, initialData, onSubmit, onCancel }) {
  const [form, setForm] = useState(initialData || {});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setForm(initialData || {});
  }, [initialData]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await onSubmit(form);
    setLoading(false);
    setForm({});
  };

  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Typography variant="h6" color="primary" gutterBottom>
          {title}
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
          {fields.map(f => (
            <TextField
              key={f.name}
              label={f.label}
              name={f.name}
              value={form[f.name] || ""}
              onChange={handleChange}
              required={f.required}
            />
          ))}
          <Button type="submit" variant="contained" color="primary" disabled={loading}>
            {loading ? "Salvando..." : (initialData ? "Salvar edição" : "Cadastrar")}
          </Button>
          {onCancel && (
            <Button variant="outlined" color="secondary" onClick={onCancel}>
              Cancelar
            </Button>
          )}
        </Box>
      </CardContent>
    </Card>
  );
}

export default function Home() {
  // Tabs: 0 = Voos, 1 = Passageiros, 2 = Aeronaves
  const [tab, setTab] = useState(0);

  // Voos
  const [flights, setFlights] = useState([]);
  const [editingFlight, setEditingFlight] = useState(null);
  const [selectedDestination, setSelectedDestination] = useState("");

  // Passageiros e aeronaves (em memória)
  const [passengers, setPassengers] = useState([]);
  const [editingPassenger, setEditingPassenger] = useState(null);
  const [aircrafts, setAircrafts] = useState([]);
  const [editingAircraft, setEditingAircraft] = useState(null);

  // Feedback visual
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  // --- Funções de voo (backend) ---
  const fetchFlights = () => {
    fetch("http://localhost:8000/flights")
      .then((res) => res.json())
      .then((data) => setFlights(data));
  };

  useEffect(() => {
    fetchFlights();
  }, []);

  const showSnackbar = (message, severity = "success") => {
    setSnackbar({ open: true, message, severity });
  };

  // Voos
  const handleAddFlight = async (flight) => {
    const res = await fetch("http://localhost:8000/flights", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(flight),
    });
    if (!res.ok) return showSnackbar("Erro ao cadastrar voo", "error");
    fetchFlights();
    showSnackbar("Voo cadastrado com sucesso!");
  };

  const handleEditFlight = async (flight) => {
    const res = await fetch(`http://localhost:8000/flights/${editingFlight.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(flight),
    });
    if (!res.ok) return showSnackbar("Erro ao editar voo", "error");
    fetchFlights();
    showSnackbar("Voo editado com sucesso!");
    setEditingFlight(null);
  };

  const handleDeleteFlight = async (flight) => {
    if (!window.confirm(`Deseja excluir o voo ${flight.code}?`)) return;
    const res = await fetch(`http://localhost:8000/flights/${flight.id}`, {
      method: "DELETE",
    });
    if (!res.ok) return showSnackbar("Erro ao excluir voo", "error");
    fetchFlights();
    showSnackbar("Voo excluído com sucesso!");
  };

  // Passageiros (em memória)
  const handleAddPassenger = async (p) => {
    setPassengers((prev) => [...prev, { ...p, id: Date.now() }]);
    showSnackbar("Passageiro cadastrado com sucesso!");
  };
  const handleEditPassenger = async (p) => {
    setPassengers((prev) =>
      prev.map((item) => (item.id === editingPassenger.id ? { ...item, ...p } : item))
    );
    showSnackbar("Passageiro editado com sucesso!");
    setEditingPassenger(null);
  };
  const handleDeletePassenger = async (p) => {
    if (!window.confirm(`Deseja excluir o passageiro ${p.name}?`)) return;
    setPassengers((prev) => prev.filter((item) => item.id !== p.id));
    showSnackbar("Passageiro excluído com sucesso!");
  };

  // Aeronaves (em memória)
  const handleAddAircraft = async (a) => {
    setAircrafts((prev) => [...prev, { ...a, id: Date.now() }]);
    showSnackbar("Aeronave cadastrada com sucesso!");
  };
  const handleEditAircraft = async (a) => {
    setAircrafts((prev) =>
      prev.map((item) => (item.id === editingAircraft.id ? { ...item, ...a } : item))
    );
    showSnackbar("Aeronave editada com sucesso!");
    setEditingAircraft(null);
  };
  const handleDeleteAircraft = async (a) => {
    if (!window.confirm(`Deseja excluir a aeronave ${a.model}?`)) return;
    setAircrafts((prev) => prev.filter((item) => item.id !== a.id));
    showSnackbar("Aeronave excluída com sucesso!");
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <FlightTakeoffIcon sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            AeroGest - Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Tabs value={tab} onChange={(_, v) => setTab(v)} centered sx={{ mb: 3 }}>
          <Tab icon={<FlightTakeoffIcon />} label="Voos" />
          <Tab icon={<PeopleIcon />} label="Passageiros" />
          <Tab icon={<AirplanemodeActiveIcon />} label="Aeronaves" />
        </Tabs>

        {/* Voos */}
        {tab === 0 && (
          <>
            <FlightForm
              onSubmit={editingFlight ? handleEditFlight : handleAddFlight}
              initialData={editingFlight}
              onCancel={editingFlight ? () => setEditingFlight(null) : undefined}
            />
            <Typography variant="h5" color="primary" gutterBottom>
              Lista de Voos
            </Typography>
            <Grid container spacing={2}>
              {flights.map((flight) => (
                <Grid item xs={12} sm={6} md={4} key={flight.id}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" color="text.secondary">
                        {flight.code}
                      </Typography>
                      <Typography>
                        {flight.origin} <FlightTakeoffIcon fontSize="small" /> {flight.destination}
                      </Typography>
                      <Box sx={{ mt: 1, display: "flex", gap: 1 }}>
                        <Button
                          size="small"
                          variant="outlined"
                          startIcon={<CloudIcon />}
                          onClick={() => setSelectedDestination(flight.destination)}
                        >
                          Clima
                        </Button>
                        <Button
                          size="small"
                          variant="outlined"
                          startIcon={<EditIcon />}
                          onClick={() => setEditingFlight(flight)}
                        >
                          Editar
                        </Button>
                        <Button
                          size="small"
                          variant="outlined"
                          color="error"
                          startIcon={<DeleteIcon />}
                          onClick={() => handleDeleteFlight(flight)}
                        >
                          Excluir
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
            <WeatherInfo destination={selectedDestination} />
          </>
        )}

        {/* Passageiros */}
        {tab === 1 && (
          <>
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
            <Typography variant="h5" color="primary" gutterBottom>
              Lista de Passageiros
            </Typography>
            <Grid container spacing={2}>
              {passengers.map((p) => (
                <Grid item xs={12} sm={6} md={4} key={p.id}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" color="text.secondary">
                        {p.name}
                      </Typography>
                      <Typography>
                        Documento: {p.document}
                      </Typography>
                      <Box sx={{ mt: 1, display: "flex", gap: 1 }}>
                        <Button
                          size="small"
                          variant="outlined"
                          startIcon={<EditIcon />}
                          onClick={() => setEditingPassenger(p)}
                        >
                          Editar
                        </Button>
                        <Button
                          size="small"
                          variant="outlined"
                          color="error"
                          startIcon={<DeleteIcon />}
                          onClick={() => handleDeletePassenger(p)}
                        >
                          Excluir
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </>
        )}

        {/* Aeronaves */}
        {tab === 2 && (
          <>
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
            <Typography variant="h5" color="primary" gutterBottom>
              Lista de Aeronaves
            </Typography>
            <Grid container spacing={2}>
              {aircrafts.map((a) => (
                <Grid item xs={12} sm={6} md={4} key={a.id}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" color="text.secondary">
                        {a.model}
                      </Typography>
                      <Typography>
                        Matrícula: {a.registration}
                      </Typography>
                      <Box sx={{ mt: 1, display: "flex", gap: 1 }}>
                        <Button
                          size="small"
                          variant="outlined"
                          startIcon={<EditIcon />}
                          onClick={() => setEditingAircraft(a)}
                        >
                          Editar
                        </Button>
                        <Button
                          size="small"
                          variant="outlined"
                          color="error"
                          startIcon={<DeleteIcon />}
                          onClick={() => handleDeleteAircraft(a)}
                        >
                          Excluir
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </>
        )}

        <Snackbar
          open={snackbar.open}
          autoHideDuration={3000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          <Alert
            onClose={() => setSnackbar({ ...snackbar, open: false })}
            severity={snackbar.severity}
            sx={{ width: "100%" }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    </>
  );
}