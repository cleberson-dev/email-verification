import express, { Request, Response } from "express";
import { PrismaClient, User } from "@prisma/client";
import redis from 'redis';

const app = express();
const prisma = new PrismaClient();
const redisClient = redis.createClient({
  host: process.env.REDIS_HOST
});

app.use(express.json());

app.get('/', (req, res) => {
  res.status(200);
  res.json({ "Hello": "World" });
});


app.get('/users', async (req, res) => {
  const users = await prisma.user.findMany({
    select: { id: true, email: true, name: true, email_confirmed: true }
  });

  res.status(200);
  res.json({ data: users });
});

app.post('/users', async (req, res) => {
  const { email, password, name } = req.body;

  if (!email || !password) {
    res.status(400);
    return res.json({ message: "'email' e 'password' são necessários." });
  }

  try {
    const newUser = await prisma.user.create({ 
      data: { email, password, name },
      select: { id: true, email: true, password: true, email_confirmed: true }
    });
    redisClient.publish('USER_CREATED', email);
    res.status(200);
    res.json(newUser);
  } catch (e) {
    let message = 'Dados inválidos';

    if (e.code === 'P2002') {
      message = 'E-mail já existente.'
    }

    res.status(400);
    res.json({ message });
  }
});


app.get('/confirm-email', async (req, res) => {
  const { token } = req.query;

  if (!token) {
    res.status(400);
    return res.json({ message: 'Token requerido' });
  }

  const userValidationToken = await prisma.userValidationToken
    .findOne({ 
      where: { token: (token as string) },
      select: { user: true, token: true }
    });

  if (!userValidationToken) {
    res.status(400);
    return res.json({ message: 'Token inválido' });
  }

  const { user } = userValidationToken;

  await prisma.user.update({
    where: { id: user.id },
    data: { email_confirmed: true }
  });

  await prisma.userValidationToken.delete({ 
    where: { token: (token as string) }
  });

  res.status(200);
  res.json({ message: `E-mail ${user.email} confirmado com sucesso` });
});

export default app;