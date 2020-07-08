import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

app.get('/', (req, res) => {
  res.status(200);
  res.json({ "Hello": "World" });
});


app.get('/users', async (req, res) => {
  const users = await prisma.user.findMany({
    select: { id: true, email: true, name: true }
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
      select: { id: true, email: true, password: true }
    });
    res.status(200);
    res.json(newUser);
  } catch (e) {
    res.status(400);
    console.log(e);
    res.json({ message: e.message });
  }
});

export default app;