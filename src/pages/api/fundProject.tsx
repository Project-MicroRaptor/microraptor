import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../db/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const body = JSON.parse(req.body);

  // Update Current Funding
  const project = await prisma.project.update({
    where: {
      id: body.id
    },
    data: {
      currentFunding: body.currentFunding
    }
  });

  // Return Project Response
  res.json(project);
}
