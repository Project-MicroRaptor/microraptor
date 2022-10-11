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
          id: session.user.id
        },
        select: {
          bio: true
        }
      });

      if (user) {
        res.status(200).json({ status: "success", data: user });
      } else {
        res.status(500).json({ status: "failed" });
      }
    } else if (req.method === "POST") {
      const body = JSON.parse(req.body);
      const bio = body.bio;

      const user = await prisma.user.update({
        where: {
          id: session.user.id
        },
        data: {
          bio
        }
      });

      if (user?.id) {
        res.status(200).json({
          status: "success",
          data: user,
          description: "Updated Successfully!"
        });
      } else {
        res
          .status(500)
          .json({ status: "failed", description: "Internal Server Error" });
      }
    } else {
      res.status(405);
      return;
    }
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      res.status(500).send(`A Prisma error has occurred: ${e.code}`);
      return;
    }
    res.status(500).send("An unknown error has occured");
  }
}
