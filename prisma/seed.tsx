import { locationPlaces } from "./locations";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.location.deleteMany();

  for (let locationPlace of locationPlaces) {
    await prisma.location.create({
      data: locationPlace,
    });
  }
}

main()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
