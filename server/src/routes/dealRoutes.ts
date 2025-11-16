import express from 'express';
import { getDeals, createDeal, updateDeal, deleteDeal } from '../controllers/dealController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.route('/').get(protect, getDeals).post(protect, createDeal);

router.route('/:id').put(protect, updateDeal).delete(protect, deleteDeal);

export default router;