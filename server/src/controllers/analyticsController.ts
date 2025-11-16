import { Response } from 'express';
import { AuthRequest } from '../middleware/authMiddleware';
import Deal from '../models/Deal';
import mongoose from 'mongoose';

export const getSalesPerformance = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?._id;

    const salesData = await Deal.aggregate([
      {
        $match: {
          user: new mongoose.Types.ObjectId(userId),
          stage: 'Won'
        }
      },
      {
        $group: {
          _id: { $month: "$updatedAt" }, 
          totalRevenue: { $sum: "$value" } 
        }
      },
      { $sort: { "_id": 1 } } 
    ]);

    const monthLabels = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
    const revenueData = new Array(12).fill(0);

    salesData.forEach(item => {
      const monthIndex = item._id - 1; 
      revenueData[monthIndex] = item.totalRevenue;
    });

    res.status(200).json({
      labels: monthLabels,
      data: revenueData
    });

  } catch (error) {
    console.error("Error fetching sales performance:", error);
    res.status(500).json({ message: 'Server Error' });
  }
};

export const getDealStageDistribution = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?._id;
    const stageData = await Deal.aggregate([
      {
        $match: { user: new mongoose.Types.ObjectId(userId) }
      },
      {
        $group: {
          _id: "$stage", 
          count: { $sum: 1 } 
        }
      },
      { $sort: { "_id": 1 } }
    ]);

   
    const labels = stageData.map(item => item._id);
    const data = stageData.map(item => item.count);
    
    if (labels.length === 0) {
      res.status(200).json({
        labels: ['Lead', 'Contacted', 'Proposal', 'Won', 'Lost'],
        data: [0, 0, 0, 0, 0]
      });
    } else {
      res.status(200).json({ labels, data });
    }

  } catch (error) {
    console.error("Error fetching deal stage distribution:", error);
    res.status(500).json({ message: 'Server Error' });
  }
};