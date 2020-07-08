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

export default app;