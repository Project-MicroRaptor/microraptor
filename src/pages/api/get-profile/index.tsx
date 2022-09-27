import { prisma } from "../../../db/prisma";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import { Prisma } from "@prisma/client";

import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  if (req.method !== "GET") {
    res.status(405);
    return;
  }

  const session = await unstable_getServerSession(req, res, authOptions);

  if (!session) {
    res.status(401);
    return;
  }

  try {
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

  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      res.status(500).send(`A Prisma error has occurred: ${e.code}`);
      return;
    }
    res.status(500).send("An unknown error has occured");
  }
}
