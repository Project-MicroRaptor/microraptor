import { locationPlaces } from "./locations";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const checkTableRowCount = await prisma.location.count();

  var hasLocationPlaces:boolean = locationPlaces != null;

  if(hasLocationPlaces == true){
    //delete previous data in Location data table
    if(checkTableRowCount > 0){
      await prisma.location.deleteMany();
    }

    //populate the location table
    for (let locationPlace of locationPlaces) {
      await prisma.location.create({
        data: locationPlace,
      });
    }
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
