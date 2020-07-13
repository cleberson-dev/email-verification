import redis from "redis";
import { PrismaClient } from "@prisma/client";
import cryptoRandomString from "crypto-random-string";

const prisma = new PrismaClient();

const worker = redis.createClient({
  host: process.env.REDIS_HOST,
});

worker.on("message", async (channel, email) => {
  if (channel !== "USER_CREATED") return;

  console.log(`User created with email ${email}`);

  const token = cryptoRandomString({ type: "base64", length: 32 });

  await prisma.userValidationToken.create({
    data: { user: { connect: { email } }, token },
  });

  console.log(`Token created (${token}) for ${email}`);
});

worker.subscribe("USER_CREATED");
