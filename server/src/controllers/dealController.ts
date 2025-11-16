import { Response } from 'express';
import Deal from '../models/Deal';
import { AuthRequest } from '../middleware/authMiddleware';

export const getDeals = async (req: AuthRequest, res: Response) => {
  try {
    const deals = await Deal.find({ user: req.user?._id }).populate('customer', 'name');
    res.status(200).json(deals);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const createDeal = async (req: AuthRequest, res: Response) => {
  const { title, value, stage, customer } = req.body;
  try {
    const deal = new Deal({
      user: req.user?._id,
      title,
      value,
      stage,
      customer,
    });
    const createdDeal = await deal.save();
    res.status(201).json(createdDeal);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const updateDeal = async (req: AuthRequest, res: Response) => {
    const { title, value, stage, customer } = req.body;
    try {
        const deal = await Deal.findById(req.params.id);

        if (!deal) {
            return res.status(404).json({ message: 'Deal not found' });
        }
        
        if (deal.user.toString() !== req.user?._id.toString()) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        deal.title = title || deal.title;
        deal.value = value || deal.value;
        deal.stage = stage || deal.stage;
        deal.customer = customer || deal.customer;

        const updatedDeal = await deal.save();
        res.json(updatedDeal);

    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};
export const deleteDeal = async (req: AuthRequest, res: Response) => {
  try {
    const deal = await Deal.findById(req.params.id);

    if (!deal) {
      return res.status(404).json({ message: 'Deal not found' });
    }

    if (deal.user.toString() !== req.user?._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await deal.deleteOne();
    res.json({ message: 'Deal removed successfully' });

  } catch (error) {
    console.error('Error deleting deal:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};