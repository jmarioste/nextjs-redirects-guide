// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { RedirectItem } from 'data/RedirectItem';
import { readFileSync } from 'fs';
import type { NextApiRequest, NextApiResponse } from 'next'
import path from 'path';

type Data = {
  redirects: RedirectItem[]
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const dbDirectory = path.join(process.cwd(), "data", "redirects.json");
  const jsonStr = readFileSync(dbDirectory).toString();
  const redirects = JSON.parse(jsonStr) as RedirectItem[];

  res.status(200).json({ redirects })
}
