import { locationPlaces } from "./locations";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function populateLocationTable() {
  for (let locationPlace of locationPlaces) {
    await prisma.location.create({
      data: locationPlace,
    });
  }
}

async function main() {
  const checkTableRowCount = await prisma.location.count();
  var checkLocationsCSVFile = 0;

  //check the data exists
  if (locationPlaces != null) {
    checkLocationsCSVFile = locationPlaces.length;
  }

  //Check the table has data and the csv file has data, then delete table contents and write to the table
  if (checkTableRowCount > 0 && checkLocationsCSVFile > 0) {
    await prisma.location.deleteMany();
    populateLocationTable();
  } else if (checkTableRowCount == 0 && checkLocationsCSVFile > 0) {
    populateLocationTable();
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
