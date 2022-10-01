import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../db/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  if (id && typeof id == "string") {
    const projectinfo = await prisma.project.findUnique({
      where: {
        id
      },
      select: {
        id: true,
        name: true,
        images: true,
        ownerId: true,
        rewards: {
          select: {
            name: true,
            cost: true,
            description: true
          }
        }
      }
    });
    res.json(projectinfo);
  }
  res.status(404);
}
