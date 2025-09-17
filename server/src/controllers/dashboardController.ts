import { Response } from 'express';
import { AuthRequest } from '../middleware/authMiddleware';
import Customer from '../models/Customer';
import Deal from '../models/Deal';

export const getDashboardStats = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?._id;
    const totalCustomers = await Customer.countDocuments({ user: userId });
    const activeDeals = await Deal.countDocuments({ 
      user: userId, 
      stage: { $nin: ['Won', 'Lost'] } 
    });
    const revenueData = await Deal.aggregate([
      { $match: { user: userId, stage: 'Won' } },
      { $group: { _id: null, totalRevenue: { $sum: '$value' } } }
    ]);
    const totalRevenue = revenueData.length > 0 ? revenueData[0].totalRevenue : 0;
   
    const totalDeals = await Deal.countDocuments({ user: userId });
    const wonDeals = await Deal.countDocuments({ user: userId, stage: 'Won' });
    const conversionRate = totalDeals > 0 ? (wonDeals / totalDeals) * 100 : 0;

    res.status(200).json({
      totalCustomers,
      activeDeals,
      totalRevenue,
      conversionRate: parseFloat(conversionRate.toFixed(2)), 
    });

  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};