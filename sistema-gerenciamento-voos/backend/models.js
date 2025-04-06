// filepath: backend/models/Flight.js
import mongoose from 'mongoose';

const flightSchema = new mongoose.Schema({
  flightNumber: String,
  departure: String,
  arrival: String,
  date: Date,
});

export default mongoose.model('Flight', flightSchema);