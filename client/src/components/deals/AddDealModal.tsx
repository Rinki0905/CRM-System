import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import type { RootState } from '../../app/store';

interface Customer { _id: string; name: string; }
interface AddDealModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDealAdded: () => void;
}

const dealStages = ['Lead', 'Contacted', 'Proposal', 'Won', 'Lost'];

const AddDealModal: React.FC<AddDealModalProps> = ({ isOpen, onClose, onDealAdded }) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [formData, setFormData] = useState({ title: '', value: '', stage: 'Lead', customer: '' });
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const fetchCustomers = async () => {
        const config = { headers: { Authorization: `Bearer ${user?.token}` } };
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/customers`, config);
        setCustomers(data);
        if (data.length > 0) {
          setFormData(prev => ({ ...prev, customer: data[0]._id }));
        }
      };
      fetchCustomers();
    }
  }, [isOpen, user?.token]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const config = { headers: { Authorization: `Bearer ${user?.token}` } };
      await axios.post(`${import.meta.env.VITE_API_URL}/deals`, formData, config);
      onDealAdded();
      onClose();
    } catch (error) {
      console.error('Failed to add deal', error);
      alert('Failed to add deal.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">Add New Deal</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Form fields... */}
          <div>
            <label htmlFor="title">Title</label>
            <input type="text" name="title" value={formData.title} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border rounded-md" />
          </div>
          <div>
            <label htmlFor="value">Value ($)</label>
            <input type="number" name="value" value={formData.value} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border rounded-md" />
          </div>
          <div>
            <label htmlFor="customer">Customer</label>
            <select name="customer" value={formData.customer} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border rounded-md">
              {customers.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="stage">Stage</label>
            <select name="stage" value={formData.stage} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border rounded-md">
              {dealStages.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div className="flex justify-end space-x-4 pt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 rounded-md">Cancel</button>
            <button type="submit" disabled={isLoading} className="px-4 py-2 bg-blue-600 text-white rounded-md">{isLoading ? 'Adding...' : 'Add Deal'}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDealModal;