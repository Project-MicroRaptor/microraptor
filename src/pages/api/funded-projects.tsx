import type { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth";
import { prisma } from "../../db/prisma";
import { authOptions } from "./auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await unstable_getServerSession(req, res, authOptions);
  if (session) {
    // Retrieve all current users payments.
    const projectIDs = await prisma.payment.findMany({
      where: {
        userID: session.user.id
      },
      select: {
        projectID: true
      },
      distinct: "projectID"
    });

    // Retrieve all projects of users payments.
    const projects = await prisma.project.findMany({
      where: {
        id: { in: projectIDs.map((project) => project.projectID) }
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

    // Return Projects
    res.json(projects);
  } else {
    // Not signed in.
    res.status(401);
  }
  res.end();
}
