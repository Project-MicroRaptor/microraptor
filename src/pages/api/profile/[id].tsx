import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../db/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  if (id && typeof id == "string") {
    const profile = await prisma.user.findUnique({
      where: {
        id
      },
      select: {
        id: true,
        name: true,
        bio: true,
        image: true,
        projects: {
          select: {
            id: true,
            name: true,
            shortDescription: true,
            active: true,
            images: true,
            currentFunding: true,
            targetFunding: true
          },
          orderBy: {
            completedAt: "asc"
          }
        }
      }
    });
    res.json(profile);
  }
  res.status(404);
}
