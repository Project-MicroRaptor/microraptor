import * as fs from "fs";
import * as path from "path";
import { parse } from "csv-parse";

type Locations = {
  id: number;
  postcode: number;
  locality: string;
  state: string;
  longitude: number;
  latitude: number;
};

var locationPlaces: Locations[];

(() => {
  //File path. If file moved or name changed this will need to be updated.
  const csvFilePath = path.resolve(__dirname, "files/australian_postcodes.csv");

  //create the column headers
  const headers = [
    "id",
    "postcode",
    "locality",
    "state",
    "longitude",
    "latitude",
  ];

  //Check if file exists and can be eccessed.
  if (fs.existsSync(csvFilePath)) {
    console.log("exists", csvFilePath);
    const fileContent = fs.readFileSync(csvFilePath, { encoding: "utf-8" });

    //parse the csv file and format the columns/data to the appropriate data type. If they are not cast all columns are read in as string by default.
    parse(
      fileContent,
      {
        delimiter: ",",
        columns: headers,
        cast: (value, context) => {
          if (context.header) return value;
          if (context.column === "id") return Number(value);
          if (context.column === "postcode") return Number(value);
          if (context.column === "locality") return String(value);
          if (context.column === "state") return String(value);
          if (context.column === "longitude") return Number(value);
          if (context.column === "latitude") return Number(value);
        },
      },
      (error, result: Locations[]) => {
        if (error) {
          console.error(error);
        }
        locationPlaces = result;
      }
    );
  } else {
    console.log("File does not exist: ", csvFilePath);
  }
})();

//export the location data read in from the csv file so the seed file can read it.
export { locationPlaces };
