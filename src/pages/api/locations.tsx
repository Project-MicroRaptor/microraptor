import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../db/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

 
  let query = {};
  req.query;


  // Retrieve all locations
  const locations = await prisma.location.findMany({
    where: {
      //reduce the size of the location list for testing. 
      postcode: {in: [830,3000]},
      // postcode: 830,
      ...query,
    },
    select: {
      id: true,
      postcode: true,
      // locality: true,
      // state: true,
      // longitude: true,
      // latitude: true,
    },
  });

  // Return locations in response.
  res.json(locations);
}
