// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getRedirectByPath } from 'data/getRedirectByPath';
import { RedirectItem } from 'data/RedirectItem';

import type { NextApiRequest, NextApiResponse } from 'next'


type Data = {
  redirect: RedirectItem | null
}

/**
 * This handler is only to simulate a backend service for middleware.
 * @param req 
 * @param res 
 */
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const body = JSON.parse(req.body);
  const source = body.source;
  const redirect = getRedirectByPath(source) ?? null;
  console.log("redirect-by-path", redirect)
  res.status(200).json({ redirect })
}
