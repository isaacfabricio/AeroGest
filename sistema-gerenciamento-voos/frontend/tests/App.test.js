import { render, screen } from '@testing-library/react';
import App from '../App'; // Ajuste o caminho para corresponder à localização real do arquivo

test('Renderiza o componente App e verifica o texto "Servidor funcionando"', () => {
  render(<App />);
  const linkElement = screen.getByText(/Servidor funcionando/i);
  expect(linkElement).toBeInTheDocument();
});