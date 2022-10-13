import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../db/prisma";
import {
  minMaxLatitudeFromRadius,
  minMaxLongitudeFromRadius
} from "../../utils/latLongUtils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Retrieve all projects matching user input.
  let query = {};
  if (req.query?.name) {
    query = {
      ...query,
      name: {
        contains: req.query.name,
        mode: "insensitive"
      }
    };
  }

  // Retrieve all projects within given category.
  if (req.query?.category) {
    query = {
      ...query,
      categories: {
        has: req.query.category
      }
    };
  }

  if (
    req.query?.latitude &&
    req.query?.longitude &&
    req.query?.radius &&
    !Array.isArray(req.query?.latitude) &&
    !Array.isArray(req.query?.longitude) &&
    !Array.isArray(req.query?.radius)
  ) {
    const latitude = Number(req.query.latitude);
    const longitude = Number(req.query.longitude);
    const radius = Number(req.query.radius);

    // Return 400 if NaN
    if (isNaN(latitude) || isNaN(longitude) || isNaN(radius)) {
      res.status(400);
      return;
    }

    const { min: minLatitude, max: maxLatitude } = minMaxLatitudeFromRadius(
      latitude,
      radius
    );

    const { min: minLongitude, max: maxLongitude } = minMaxLongitudeFromRadius(
      latitude,
      longitude,
      radius
    );

    const locations = await prisma.location.findMany({
      where: {
        AND: [
          {
            longitude: {
              gte: minLongitude,
              lte: maxLongitude
            }
          },
          {
            latitude: {
              gte: minLatitude,
              lte: maxLatitude
            }
          }
        ]
      },
      select: {
        postcode: true
      }
    });

    const postcodes: number[] = [];
    locations.forEach((location) => {
      postcodes.push(location.postcode);
    });

    query = {
      ...query,
      postcode: {
        in: postcodes
      }
    };
  }

  // Retrieve all active projects, filter by API Request parameters.
  const projects = await prisma.project.findMany({
    where: {
      active: true,
      ...query
    },
    select: {
      id: true,
      name: true,
      shortDescription: true,
      images: true,
      currentFunding: true,
      targetFunding: true
    }
  });

  // Sort projects based on percentage funded - descending.
  projects.sort(
    (a, b) =>
      b.currentFunding / b.targetFunding - a.currentFunding / a.targetFunding
  );

  // Return projects in response.
  res.json(projects);
}
