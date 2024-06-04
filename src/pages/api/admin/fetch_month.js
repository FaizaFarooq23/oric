import { getSession } from 'next-auth/react';
import prisma from '@/lib/prisma';

export default async function handler(req, res) {
    const session = await getSession({ req });
    if (!session) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }
    
    try {
        const projects = await prisma.Research_Project.findMany();
    
        let month = new Date().getMonth();
        let month_name = new Date().toLocaleString('default', { month: 'long' });
    
        res.status(200).json({ month, month_name });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: 'Something went wrong' });
    }
    }

