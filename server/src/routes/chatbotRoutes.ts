import express from 'express';
import { handleChat } from '../controllers/chatbotController';
import { protect } from '../middleware/authMiddleware';
const router = express.Router();
router.post('/', protect, handleChat); 

export default router;