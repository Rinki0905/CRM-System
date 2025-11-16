import express from 'express';
import { getDealStageDistribution, getSalesPerformance } from '../controllers/analyticsController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/sales', protect, getSalesPerformance);

router.get('/deal-stages', protect, getDealStageDistribution);

export default router;