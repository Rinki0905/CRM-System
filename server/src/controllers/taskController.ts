import { Response } from 'express';
import Task from '../models/Task';
import { AuthRequest } from '../middleware/authMiddleware';


export const getTasks = async (req: AuthRequest, res: Response) => {
  try {
    const tasks = await Task.find({ user: req.user?._id }).sort({ dueDate: 1 });
    res.status(200).json(tasks);
  } catch (error) { res.status(500).json({ message: 'Server Error' }); }
};
export const getUpcomingTasks = async (req: AuthRequest, res: Response) => {
  try {
    const tasks = await Task.find({ 
        user: req.user?._id, 
        isCompleted: false,
        dueDate: { $gte: new Date() } 
    })
    .sort({ dueDate: 1 }) 
    .limit(3); 3
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
export const createTask = async (req: AuthRequest, res: Response) => {
  const { title, description, dueDate } = req.body;
  try {
    const task = new Task({ user: req.user?._id, title, description, dueDate });
    const createdTask = await task.save();
    res.status(201).json(createdTask);
  } catch (error) { res.status(500).json({ message: 'Server Error' }); }
};
export const updateTask = async (req: AuthRequest, res: Response) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task || task.user.toString() !== req.user?._id.toString()) {
      return res.status(404).json({ message: 'Task not found or not authorized' });
    }
    task.title = req.body.title || task.title;
    task.description = req.body.description || task.description;
    task.dueDate = req.body.dueDate || task.dueDate;
    if (typeof req.body.isCompleted === 'boolean') {
      task.isCompleted = req.body.isCompleted;
    }
    const updatedTask = await task.save();
    res.json(updatedTask);
  } catch (error) { res.status(500).json({ message: 'Server Error' }); }
};

export const deleteTask = async (req: AuthRequest, res: Response) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task || task.user.toString() !== req.user?._id.toString()) {
      return res.status(404).json({ message: 'Task not found or not authorized' });
    }
    await task.deleteOne();
    res.json({ message: 'Task removed' });
  } catch (error) { res.status(500).json({ message: 'Server Error' }); }
};