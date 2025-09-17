import { Response } from 'express';
import Customer from '../models/Customer';
import { AuthRequest } from '../middleware/authMiddleware';

export const getCustomers = async (req: AuthRequest, res: Response) => {
  try {
    const customers = await Customer.find({ user: req.user?._id });
    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const createCustomer = async (req: AuthRequest, res: Response) => {
  const { name, email, phone, company } = req.body;
  try {
    const customer = new Customer({
      user: req.user?._id,
      name,
      email,
      phone,
      company,
    });
    const createdCustomer = await customer.save();
    res.status(201).json(createdCustomer);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const updateCustomer = async (req: AuthRequest, res: Response) => {
    const { name, email, phone, company } = req.body;
    try {
        const customer = await Customer.findById(req.params.id);

        if (!customer) {
            return res.status(404).json({ message: 'Customer not found' });
        }
    
        if (customer.user.toString() !== req.user?._id.toString()) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        customer.name = name || customer.name;
        customer.email = email || customer.email;
        customer.phone = phone || customer.phone;
        customer.company = company || customer.company;

        const updatedCustomer = await customer.save();
        res.json(updatedCustomer);

    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};
export const deleteCustomer = async (req: AuthRequest, res: Response) => {
    try {
        const customer = await Customer.findById(req.params.id);

        if (!customer) {
            return res.status(404).json({ message: 'Customer not found' });
        }
        
        if (customer.user.toString() !== req.user?._id.toString()) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        await customer.deleteOne();
        res.json({ message: 'Customer removed' });

    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};
export const getRecentCustomers = async (req: AuthRequest, res: Response) => {
  try {
    const customers = await Customer.find({ user: req.user?._id })
      .sort({ createdAt: -1 })
      .limit(5); 
    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};