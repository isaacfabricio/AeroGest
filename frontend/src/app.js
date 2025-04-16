// filepath: backend/app.js
import express from 'express';
import flightRouter from './routes/flight';

const app = express();

app.use('/api', flightRouter);

app.listen(3000, () => {
  console.log('Server started on port 3000');
});import React, { useState } from 'react';
import FlightForm from './components/flightform';
import FlightTable from './components/FlightTable';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [refresh, setRefresh] = useState(false);

  const handleSuccess = () => {
    setRefresh(!refresh); // Atualiza a lista de voos
    toast.success('Voo criado com sucesso!');
  };

  return (
    <div>
      <h1>Gerenciamento de Voos</h1>
      <FlightForm onSuccess={handleSuccess} />
      <FlightTable />
      <ToastContainer />
    </div>
  );
};

export default App;

