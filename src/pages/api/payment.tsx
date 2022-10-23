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
      projectID: body.paymentInformation.projectID,
      userID: body.paymentInformation.userID,
      rewardID: body.paymentInformation.rewardID,
      amount: body.paymentInformation.amount
    }
  });

  // Update Current Funding
  const project = await prisma.project.update({
    where: {
      id: body.paymentInformation.projectID
    },
    data: {
      currentFunding: body.currentFunding + body.paymentInformation.amount
    }
  });

  // Return Payment Response
  res.json({ payment, project });
}
