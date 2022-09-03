import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../db/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let query = {};
  if (req.query?.name) {
    query = {
      ...query,
      active: true,
      name: {
        contains: req.query.name,
        mode: "insensitive",
      },
    };
  }

  const projects = await prisma.project.findMany({
    where: {
      ...query,
    },
    select: {
      id: true,
      name: true,
      shortDescription: true,
      images: true,
      currentFunding: true,
      targetFunding: true,
    },
  });
  res.json(projects);
}
