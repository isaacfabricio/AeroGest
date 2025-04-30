-- Exemplo de script SQL para testar a conexão com o banco SQL Server (Azure SQL)

-- Cria a tabela Flight (caso não exista)
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Flight' AND xtype='U')
CREATE TABLE Flight (
    id INT IDENTITY(1,1) PRIMARY KEY,
    flightNumber NVARCHAR(255) UNIQUE NOT NULL,
    origin NVARCHAR(255) NOT NULL,
    destination NVARCHAR(255) NOT NULL,
    status NVARCHAR(50) DEFAULT 'Scheduled',
    passengers INT DEFAULT 0,
    departureTime DATETIME NULL,
    arrivalTime DATETIME NULL,
    createdAt DATETIME DEFAULT GETDATE(),
    updatedAt DATETIME DEFAULT GETDATE()
);

-- Insere um registro de exemplo
INSERT INTO Flight (flightNumber, origin, destination, status, passengers, departureTime, arrivalTime)
VALUES ('AB123', 'São Paulo', 'Rio de Janeiro', 'Scheduled', 100, GETDATE(), GETDATE());

-- Consulta os registros da tabela Flight
SELECT * FROM Flight;
