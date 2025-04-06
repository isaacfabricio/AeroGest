import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    include: ['**/*.test.js'], // Inclua arquivos com o padrão .test.js
    exclude: ['node_modules', 'dist'], // Exclua pastas desnecessárias
    environment: 'jsdom', // Configura o ambiente para testes com React
  },
});