import Flight from './models.js';

export const getFlights = async (req, res) => {
  try {
    const flights = await Flight.find();
    res.json(flights);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createFlight = async (req, res) => {
  const flight = new Flight({
    flightNumber: req.body.flightNumber,
    departure: req.body.departure,
    arrival: req.body.arrival,
    date: req.body.date
  });

  try {
    const newFlight = await flight.save();
    res.status(201).json(newFlight);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const updateFlight = async (req, res) => {
  try {
    const updatedFlight = await Flight.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedFlight);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteFlight = async (req, res) => {
  try {
    await Flight.findByIdAndDelete(req.params.id);
    res.json({ message: 'Voo removido com sucesso' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
