import express from 'express';
import { getCustomers, createCustomer, updateCustomer, deleteCustomer,getRecentCustomers} from '../controllers/customerController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();
router.get('/recent', protect, getRecentCustomers); 
router.route('/').get(protect, getCustomers).post(protect, createCustomer);
router.route('/:id').put(protect, updateCustomer).delete(protect, deleteCustomer);

export default router;