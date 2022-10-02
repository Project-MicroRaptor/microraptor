import { prisma } from "../../../db/prisma";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import { Prisma } from "@prisma/client";

import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  const session = await unstable_getServerSession(req, res, authOptions);

  if (!session) {
    res.status(401);
    return;
  }

  try {
    if (req.method === "GET") {
      const user = await prisma.user.findUnique({
        where: {
          id: session.user.id,
        },
        select: {
          bio: true,
        },
      });

      if (typeof user === "object") {
        res.status(200).json({ status: "success", data: user });
      } else {
        res.status(200).json({ status: "failed" });
      }
    } else {
      const body = JSON.parse(req.body);
      const bio = body.bio;

      const project = await prisma.user.update({
        where: {
          id: session.user.id,
        },
        data: {
          bio
        },
      });

      if (typeof project === "object" && project.id) {
        res.status(200).json({ status: "success", data: project, description: "Updated Successfully!" });
      } else {
        res.status(200).json({ status: "failed", description: "Internal Server Error" });
      }
    }

  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      res.status(500).send(`A Prisma error has occurred: ${e.code}`);
      return;
    }
    res.status(500).send("An unknown error has occured");
  }
}
