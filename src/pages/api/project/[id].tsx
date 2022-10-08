import type { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { prisma } from "./../../../db/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  // GET API
  if (req.method == "GET") {
    if (id && typeof id == "string") {
      const projectinfo = await prisma.project.findUnique({
        where: {
          id
        },
        select: {
          id: true,
          name: true,
          shortDescription: true,
          images: true,
          currentFunding: true,
          targetFunding: true,
          postcode: true,
          categories: true,
          createdAt: true,
          completedAt: true,
          aboutBusiness: true,
          aboutOwner: true,
          businessPlan: true,
          rewards: {
            select: {
              name: true,
              cost: true,
              description: true
            }
          },
          active: true,
          owner: {
            select: {
              id: true,
              name: true,
              image: true
            }
          }
        }
      });
      res.json(projectinfo);
      return;
    }
    res.status(404);
    return;
  }

  // PUT API
  else if (req.method == "PUT") {
    const session = await unstable_getServerSession(req, res, authOptions);
    if (!session) {
      // Not signed in. Cannot create project
      res.status(401);
      return;
    }

    if (!id || typeof id !== "string") {
      res.status(400);
      return;
    }

    const projectOwner = await prisma.project.findUnique({
      where: {
        id
      },
      select: {
        ownerId: true
      }
    });

    if (projectOwner?.ownerId !== session.user.id) {
      res.status(401);
      return;
    }

    const body = JSON.parse(req.body);
    const projectDetails = body.projectDetails;
    if (!projectDetails) {
      res.status(400).send("Missing Project Details");
      return;
    }

    const project = await prisma.project.update({
      where: {
        id
      },
      data: {
        ...projectDetails
      }
    });

    if (project?.id) {
      res.status(200).json({ project });
      return;
    } else {
      res
        .status(500)
        .json({ status: "failed", description: "Internal Server Error" });
      return;
    }
  }

  // API method invalid
  else {
    res.status(405);
  }
}
