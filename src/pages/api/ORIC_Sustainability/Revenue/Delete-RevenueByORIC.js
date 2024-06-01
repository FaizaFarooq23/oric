import prisma from '@/lib/prisma';

export default async function handler(req, res) {
  if (req.method === 'DELETE') {
    const { id } = req.query;

    try {
      await prisma.RevenueByORIC.delete({
        where: {
        id: parseInt(id),
        },
      });
      res.status(200).json({ message: 'Project deleted successfully' });
    } catch (error) {
      console.error('Error deleting project:', error);
      res.status(500).json({ message: 'Error deleting project' });
    }
  } else {
    res.status(405).end(); 
  }
}