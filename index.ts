import { PrismaClient, UserCreateInput } from "@prisma/client";



const prisma = new PrismaClient();

async function main() {
  const allUsers = await prisma.user.findMany({
    select: { id: true, email: true, name: true }
  });
  console.log(allUsers);
}



main()
  .catch(e => {
    throw e;
  })
  .finally(async () => {
    await prisma.disconnect();
  });