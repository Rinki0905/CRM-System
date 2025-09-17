import express from 'express';
import { getTasks, createTask, updateTask, deleteTask, getUpcomingTasks} from '../controllers/taskController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();
router.get('/upcoming', protect, getUpcomingTasks);

router.route('/').get(protect, getTasks).post(protect, createTask);
router.route('/:id').put(protect, updateTask).delete(protect, deleteTask);

export default router;