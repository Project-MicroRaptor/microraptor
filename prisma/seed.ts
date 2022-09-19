import {locations} from './locations';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.location.deleteMany()

  for(let location of locations){
    await prisma.location.create({
      data: location
    });
  }
}

main()
  .catch((e) => {
    console.log(e);
    process.exit(1);
})
  .finally(() =>{
    prisma.$disconnect();
})
