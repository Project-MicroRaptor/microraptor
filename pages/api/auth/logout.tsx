import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const returnTo = encodeURI(process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000');
  res.redirect(
    `${process.env.AUTH0_ISSUER_BASE_URL}/v2/logout?client_id=${process.env.AUTH0_CLIENT_ID}&returnTo=${returnTo}`
  );
}
