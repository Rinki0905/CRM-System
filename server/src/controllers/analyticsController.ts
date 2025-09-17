import { Response } from 'express';
import { AuthRequest } from '../middleware/authMiddleware';

export const getSalesPerformance = async (req: AuthRequest, res: Response) => {
  try {
    const sampleData = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June'],
      data: [12000, 19000, 15000, 21000, 18000, 25000],
    };
    res.status(200).json(sampleData);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};