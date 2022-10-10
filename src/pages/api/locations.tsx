import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../db/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let postcodeQuery = {};
  let localityQuery = {};
  if (req.query.search && !Array.isArray(req.query.search)) {
    let postcode = !isNaN(Number(req.query.search))
      ? Number(req.query.search)
      : null;

    if (postcode) {
      postcodeQuery = {
        postcode: {
          in: [postcode]
        }
      };
    }

    localityQuery = {
      locality: {
        contains: req.query.search,
        mode: "insensitive"
      }
    };
  }

  // Retrieve all locations
  const locations = await prisma.location.findMany({
    where: {
      OR: [
        {
          ...postcodeQuery
        },
        {
          ...localityQuery
        }
      ]
    },
    select: {
      id: true,
      postcode: true,
      locality: true,
      state: true,
      longitude: true,
      latitude: true
    }
  });

  // Return locations in response.
  res.json(locations);
}
