// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (typeof req.query.pathname === 'undefined') {
    return res.status(404).end() // .json({ message: 'Invalid secret key' })
  }

  if (req.query.secret !== process.env.SECRET_TOKEN) {
    return res.status(401).end() // .json({ message: 'Invalid secret key' })
  }

  try {
    await res.revalidate(req.query.pathname as string || '/')
    return res.status(200).end()
  } catch (error: any) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return res.status(500).send('Error revalidating: ' + error.message)
  }
}
