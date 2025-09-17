import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import type { RootState } from '../../app/store';

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTaskAdded: () => void;
}

const AddTaskModal: React.FC<AddTaskModalProps> = ({ isOpen, onClose, onTaskAdded }) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [formData, setFormData] = useState({ title: '', description: '', dueDate: '' });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const config = { headers: { Authorization: `Bearer ${user?.token}` } };
      await axios.post(`${import.meta.env.VITE_API_URL}/tasks`, formData, config);
      onTaskAdded();
      onClose();
      setFormData({ title: '', description: '', dueDate: '' });
    } catch (error) {
      console.error('Failed to add task', error);
      alert('Failed to add task.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">Add New Task</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title">Title</label>
            <input type="text" name="title" value={formData.title} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border rounded-md" />
          </div>
          <div>
            <label htmlFor="description">Description (optional)</label>
            <textarea name="description" value={formData.description} onChange={handleChange} rows={3} className="mt-1 block w-full px-3 py-2 border rounded-md" />
          </div>
          <div>
            <label htmlFor="dueDate">Due Date</label>
            <input type="date" name="dueDate" value={formData.dueDate} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border rounded-md" />
          </div>
          <div className="flex justify-end space-x-4 pt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 rounded-md">Cancel</button>
            <button type="submit" disabled={isLoading} className="px-4 py-2 bg-blue-600 text-white rounded-md">{isLoading ? 'Adding...' : 'Add Task'}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTaskModal;