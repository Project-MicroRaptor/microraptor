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
  const csvFilePath = path.resolve(__dirname, "files/australian_postcodes.csv");

  const headers = [
    "id",
    "postcode",
    "locality",
    "state",
    "longitude",
    "latitude",
  ];

  const fileContent = fs.readFileSync(csvFilePath, { encoding: "utf-8" });

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
})();

export { locationPlaces };
