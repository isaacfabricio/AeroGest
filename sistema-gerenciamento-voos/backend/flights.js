// filepath: backend/routes/flights.js
import express from 'express';
import { getFlights } from '../controllers/flightsController.js';

const router = express.Router();

router.get('/', getFlights);

export default router;