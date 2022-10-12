import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../db/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const body = JSON.parse(req.body);

  // Create Payment Record
  const payment = await prisma.payment.create({
    data: {
      projectID: body.projectID,
      userID: body.userID,
      rewardID: body.rewardID,
      amount: body.amount
    }
  });

  // Return Payment Response
  res.json(payment);
}
