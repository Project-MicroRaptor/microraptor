import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../db/prisma"
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await unstable_getServerSession(req, res, authOptions);
  if (session) {
    // Signed in
    const profile = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
      select: {
        id: true,
        name: true,
        bio: true,
        image: true,
      },
    });
    res.json(profile);
  } else {
    // Not Signed in
    res.status(401);
  }
  res.end();
}
