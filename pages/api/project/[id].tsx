import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from './../../../db/prisma';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { id } = req.query;

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
                rewards: true,
            },
        });
        res.json(projectinfo);
    }
    res.status(404);
}