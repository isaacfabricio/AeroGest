import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const users = await prisma.user.findMany();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar usuários' });
    }
  } else if (req.method === 'POST') {
    const { name, email } = req.body;
    if (!name || !email) {
      res.status(400).json({ error: 'Nome e email são obrigatórios' });
      return;
    }
    try {
      const newUser = await prisma.user.create({
        data: { name, email },
      });
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar usuário' });
    }
  } else {
    res.status(405).json({ error: 'Método não permitido' });
  }
}
