'use client'

import React, { useState, useEffect } from 'react'
import FlightsTable from '../components/FlightsTable'

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

export default function Home() {
  const [flights, setFlights] = useState<Flight[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const response = await fetch('http://localhost:3001/flights')
        if (!response.ok) throw new Error('Erro ao carregar voos')
        const text = await response.text()
        try {
          // Corrige formato malformado do JSON
          const fixedJson = text.replace(/}{/g, '},{')
          const data = JSON.parse(`[${fixedJson}]`)
          setFlights(data.map((flight: any) => ({
            ...flight,
            id: flight._id // Mapeia _id para id para compatibilidade
          })))
        } catch (err) {
          setError('Erro ao processar dados dos voos')
        }
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchFlights()
  }, [])

  const activeFlights = flights.filter(f => f.status === 'Em voo').length
  const totalPassengers = flights.reduce((sum, flight) => sum + flight.passengers, 0)

  return (
    <main className="container mx-auto p-4 bg-gradient-to-b from-sky-50 to-white min-h-screen">
      <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-electric mb-8">
        Sistema de Gerenciamento de Voos
      </h1>
      
      {loading ? (
        <div className="animate-pulse flex space-x-4">
          <div className="flex-1 space-y-4 py-1">
            <div className="h-4 bg-sky-200 rounded w-3/4"></div>
          </div>
        </div>
      ) : error ? (
        <p className="text-danger font-medium p-4 bg-danger/10 rounded-lg">{error}</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="bg-gradient-to-br from-primary/10 to-electric/10 p-6 rounded-xl border border-primary/20 shadow-glow hover:shadow-lg transition-all">
              <h2 className="text-xl font-bold text-primary mb-2">Voos Ativos</h2>
              <p className="text-3xl font-extrabold text-electric">{activeFlights}</p>
              <p className="text-sm text-primary/80">voos em andamento</p>
            </div>
            <div className="bg-gradient-to-br from-sky-100 to-white p-6 rounded-xl border border-sky-200 shadow hover:shadow-lg transition-all">
              <h2 className="text-xl font-bold text-sky-800 mb-2">Passageiros</h2>
              <p className="text-3xl font-extrabold text-sky-600">{totalPassengers}</p>
              <p className="text-sm text-sky-600/80">passageiros hoje</p>
            </div>
            <div className="bg-gradient-to-br from-success/10 to-neon/10 p-6 rounded-xl border border-success/20 shadow hover:shadow-lg transition-all">
              <h2 className="text-xl font-bold text-success mb-2">Status</h2>
              <p className="text-lg font-semibold text-success">Sistema operacional</p>
              <p className="text-xs text-success/80 mt-1">Última atualização: agora</p>
            </div>
          </div>

          <div className="mb-4">
            <h2 className="text-2xl font-bold mb-4">Lista de Voos</h2>
            <FlightsTable flights={flights} />
          </div>
        </>
      )}
    </main>
  )
}
