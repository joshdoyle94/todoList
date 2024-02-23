import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/lib/prisma'

export default async function handle(
    req: NextApiRequest,
    res: NextApiResponse,
  ) {

    if (req.method === 'GET') {
        // GET /api/items:id - Get all items
        try {
          const items = await prisma.listItems.findMany();
          res.status(200).json(items);
        }   catch (error) {
            console.error('Error fetching items:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
        } else if (req.method === 'POST') {
            try {
                const { item, completed } = req.body
                const newItem = await prisma.listItems.create({
                data: {
                    item: item,
                    completed: completed,
                }})
                res.status(200).json(newItem)
        }   catch (error) {
            console.error('Error creating item', error);
            res.status(500).json({ error: 'Internal server error' });
          }
        } else {
        // Handle unsupported HTTP methods
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
      }
}