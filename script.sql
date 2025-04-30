-- Exemplo de script SQL para testar a conexão com o banco PostgreSQL

-- Cria a tabela Flight (caso não exista)
CREATE TABLE IF NOT EXISTS Flight (
    id SERIAL PRIMARY KEY,
    flightNumber VARCHAR(255) UNIQUE NOT NULL,
    origin VARCHAR(255) NOT NULL,
    destination VARCHAR(255) NOT NULL,
    status VARCHAR(50) DEFAULT 'Scheduled',
    passengers INT DEFAULT 0,
    departureTime TIMESTAMP NULL,
    arrivalTime TIMESTAMP NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insere um registro de exemplo
INSERT INTO Flight (flightNumber, origin, destination, status, passengers, departureTime, arrivalTime)
VALUES ('AB123', 'São Paulo', 'Rio de Janeiro', 'Scheduled', 100, NOW(), NOW());

-- Consulta os registros da tabela Flight
SELECT * FROM Flight;
