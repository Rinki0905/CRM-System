import express from 'express';
import { getSalesPerformance } from '../controllers/analyticsController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/sales', protect, getSalesPerformance);

export default router;