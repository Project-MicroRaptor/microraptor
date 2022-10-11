import type { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth";
import { prisma } from "../../../db/prisma";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // POST METHOD
  if (req.method == "POST") {
    const { projectId, message, ownerId } = req.query;

    //check if params exist
    if (
      !projectId ||
      projectId == "" ||
      !message ||
      message == "" ||
      !ownerId ||
      ownerId == ""
    ) {
      res.status(400);
      return;
    }

    // check params type is !Array ( prisma requirement )
    if (Array.isArray(projectId) || typeof projectId !== "string") {
      res.status(400);
      return;
    }

    if (Array.isArray(message) || typeof message !== "string") {
      res.status(400);
      return;
    }

    if (Array.isArray(ownerId) || typeof ownerId !== "string") {
      res.status(400);
      return;
    }

    const session = await unstable_getServerSession(req, res, authOptions);

    if (!session) {
      res.status(401);
      return;
    }

    // check for existing messageGroup
    const messageGroupInfo = await prisma.messageGroup.findMany({
      where: {
        projectId: projectId,
        users: {
          some: {
            id: session.user.id
          }
        }
      },
      select: {
        id: true
      }
    });

    let messageGroupId;

    //if messageGroup does not exist, create it
    if (Array.isArray(messageGroupInfo) && messageGroupInfo.length) {
      messageGroupId = messageGroupInfo[0].id;
    } else {
      const newMessageGroup = await prisma.messageGroup.create({
        data: {
          users: {
            connect: [
              {
                id: ownerId
              },
              {
                id: session.user.id
              }
            ]
          },
          project: {
            connect: {
              id: projectId
            }
          }
        }
      });

      messageGroupId = newMessageGroup.id;
    }

    // create message from user data
    await prisma.message.create({
      data: {
        group: {
          connect: {
            id: messageGroupId
          }
        },
        from: {
          connect: {
            id: session.user.id
          }
        },
        body: message
      }
    });

    res.json({ id: messageGroupId });
    return;
  }

  // GET METHOD
  else if (req.method == "GET") {
    const session = await unstable_getServerSession(req, res, authOptions);

    if (!session) {
      res.status(401);
      return;
    }
    const messageGroupInfo = await prisma.messageGroup.findMany({
      where: {
        users: {
          some: {
            id: session.user.id
          }
        }
      },
      select: {
        id: true,
        users: {
          select: {
            id: true,
            name: true,
            image: true
          }
        },
        messages: {
          select: {
            id: true,
            from: true,
            body: true,
            timestamp: true
          },
          orderBy: {
            id: "desc"
          },
          take: 1
        },
        project: {
          select: {
            name: true
          }
        }
      }
    });
    res.status(200).json({ messageGroupInfo });
  }

  // API method invalid
  else {
    res.status(405);
    return;
  }
}
