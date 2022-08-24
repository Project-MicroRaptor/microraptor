import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../db/prisma";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
    ) {
        const profile = await prisma.user.findMany({
            select: {
                name: true,
                age: true,
                location: true,
                bio: true,
                projects: true,
            },
        });
    res.json(profile);
}
