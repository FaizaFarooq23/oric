import prisma from '@/lib/prisma';

export default async function handler(req, res) {
  if (req.method === 'DELETE') {
    const { projectId } = req.query;

    try {
      await prisma.Research_Project.delete({
        where: {
          project_id: parseInt(projectId),
        },
      });
      res.status(200).json({ message: 'Project deleted successfully' });
    } catch (error) {
      console.error('Error deleting project:', error);
      res.status(500).json({ message: 'Error deleting project' });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
