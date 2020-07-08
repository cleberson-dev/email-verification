import redis from "redis";

const worker = redis.createClient({
  host: process.env.REDIS_HOST
});

worker.on('message', (channel, email) => {
  if (channel !== 'USER_CREATED') return;

  console.log(`User created with email ${email}`);
});


worker.subscribe('USER_CREATED');