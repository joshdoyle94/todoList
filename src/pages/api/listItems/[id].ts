import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {

  if (req.method === 'GET') {
    // GET /api/items:id - Get unique item
    const itemId = Number(req.query.id)
    try {
      const item = await prisma.listItems.findUnique({
        where: {
          id: itemId
        }
      });
      res.status(200).json(item);
    } catch (error) {
      console.error('Error fetching item:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else if (req.method === 'PUT') {
    // POST /api/items:id - Create a new item
    const itemId = Number(req.query.id)
    const { item, completed } = req.body;
    try {
      const newItem = await prisma.listItems.update({
        where: {
          id: itemId
        },
        data: {
          item,
          completed
        },
      });
      res.status(201).json(newItem);
    } catch (error) {
      console.error('Error creating item:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else if (req.method === 'DELETE') {
    // DELETE /api/items:id - Create a new item
    const itemId = Number(req.query.id)
    try {
      const deleteItem = await prisma.listItems.delete({
        where: {
          id: itemId,
        },
      })
      res.json(deleteItem)
    } catch (error) {
      console.error('Error creating item:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    // Handle unsupported HTTP methods
    res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}