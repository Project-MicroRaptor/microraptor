// export const locations =[
//   {
//     id: 230,
//     postcode: 200,
//     locality: 'ANU',
//     state: 'ACT',
//     longitude: 149.119,
//     latitude: -35.2777
//   },
//   {
//     id: 21820,
//     postcode: 200,
//     locality: 'Australian National University',
//     state: 'ACT',
//     longitude: 149.1189,
//     latitude: -35.2777
//   },
//   {
//     id: 232,
//     postcode: 800,
//     locality: 'DARWIN',
//     state: 'NT',
//     longitude: 130.83668,
//     latitude: -12.458684
//   },
//   {
//     id: 24049,
//     postcode: 800,
//     locality: 'DARWIN CITY',
//     state: 'NT',
//     longitude: 130.83668,
//     latitude: -12.458684
//   }
//  ];
import * as fs from "fs";
import * as path from "path";
import { parse } from 'csv-parse';

type Locations = {
  id: number;
  postcode: number;
  locality: string;
  state: number;
  longitude: number;
  latitude: number;
};

(() => {
  const csvFilePath = path.resolve(__dirname, 'prisma/files/australian_postcodes.csv');

  const headers = ['id', 'postcode', 'locality', 'state' ,'longitude', 'latitude'];

  const fileContent = fs.readFileSync(csvFilePath, { encoding: 'utf-8' });

  parse(fileContent, {
    delimiter: ',',
    columns: headers,
  }, (error, result: Locations[]) => {
    if (error) {
      console.error(error);
    }

    console.log("Result", result);
    console.error("test");
  });
})();