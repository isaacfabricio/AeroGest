import { describe, it, expect } from 'vitest'
import request from 'supertest'
import app from '../server' // Assuming server exports the express app

describe('GET /flights', () => {
  it('should return 200 and an array of flights', async () => {
    const response = await request(app).get('/flights')
    expect(response.status).toBe(200)
    expect(Array.isArray(response.body)).toBe(true)
  })
})
