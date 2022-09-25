import { prisma } from "./../../../db/prisma";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import { Prisma } from "@prisma/client";

import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Only allow post method
  if (req.method !== "POST") {
    res.status(405);
    return;
  }

  const session = await unstable_getServerSession(req, res, authOptions);
  if (!session) {
    // Not signed in. Cannot create project
    res.status(401);
    return;
  }

  const body = JSON.parse(req.body);
  const projectDetails = body.projectDetails;
  if (!projectDetails) {
    res.status(400).send("Missing Project Details");
  }

  try {
    const project = await prisma.project.create({
      data: {
        ...projectDetails,
        owner: {
          connect: {
            id: session.user.id,
          },
        },
      },
    });

    const rewardDetails = body.rewardDetails;
    if (rewardDetails && Array.isArray(rewardDetails)) {
      rewardDetails.forEach(async (reward) => {
        await prisma.projectReward.create({
          data: {
            name: reward.name,
            description: reward.description,
            cost: reward.cost,
            project: {
              connect: {
                id: project.id,
              },
            },
          },
        });
      });
    }

    res.status(200).json({ project });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      res.status(500).send(`A Prisma error has occurred: ${e.code}`);
      return;
    }
    res.status(500).send("An unknown error has occured");
  }
}
