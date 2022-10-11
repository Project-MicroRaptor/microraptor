import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../db/prisma";

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

  // Retrieve all active projects, filter by API Request parameters.
  const projects = await prisma.project.findMany({
    where: {
      active: true,
      ...query
    },
    select: {
      id: true,
      name: true,
      active: true,
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
