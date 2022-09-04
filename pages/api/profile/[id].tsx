import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from '../../../db/prisma';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { id } = req.query;

    if (id && typeof id == "string") {
        const profile = await prisma.user.findUnique({
            where: {
                id
            },
            select: {
                id: true,
                name: true,
                bio: true,
                age: true,
                location: true,
                image: true,
            },
        });
        res.json(profile);
    }
    res.status(404);
}
