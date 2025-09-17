import express from 'express';
import { getDeals, createDeal, updateDeal } from '../controllers/dealController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.route('/').get(protect, getDeals).post(protect, createDeal);
router.route('/:id').put(protect, updateDeal);

export default router;