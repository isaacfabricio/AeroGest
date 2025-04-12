'use client'

interface Flight {
  _id: string
  number: string
  origin: string
  destination: string
  status: string
  passengers: number
  departureTime?: string
  arrivalTime?: string
}
import { motion } from 'framer-motion'

interface FlightsTableProps {
  flights: Flight[]
}

export default function FlightsTable({ flights }: FlightsTableProps) {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-glow overflow-hidden transition-all duration-300 hover:shadow-lg border border-primary/20">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-primary/10">
          <thead className="bg-gradient-to-r from-primary to-electric">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider">Número</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider">Origem</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider">Destino</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider">Passageiros</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-white uppercase tracking-wider">Horário</th>
            </tr>
          </thead>
          <tbody className="bg-white/50 divide-y divide-primary/10">
            {flights.map((flight, index) => (
              <motion.tr 
                key={flight._id} 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="hover:bg-primary/5 transition-colors duration-200"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm font-bold text-electric">#{flight.number}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                  {flight.origin}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                  {flight.destination}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-3 py-1 inline-flex text-xs leading-5 font-bold rounded-full ${
                    flight.status === 'Em voo' ? 'bg-success/20 text-success animate-pulse' :
                    flight.status === 'Cancelado' ? 'bg-danger/20 text-danger' :
                    'bg-warning/20 text-warning'
                  }`}>
                    {flight.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                  {flight.passengers}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {flight.departureTime && new Date(flight.departureTime).toLocaleTimeString()}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
