import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../db/prisma";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const projectinfo = await prisma.project.findMany({
        where: {
            active: true,
        },
        select: {
            id: true,
            name: true,
            shortDescription: true,
            images: true,
            currentFunding: true,
            targetFunding: true,
        },
    });
    res.json(projectinfo);
}
