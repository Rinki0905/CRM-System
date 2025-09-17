import  { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import type { RootState } from '../app/store';
import PageHeader from '../components/layout/PageHeader';
import AddCustomerModal from '../components/customers/AddCustomerModal';

interface Customer {
  _id: string;
  name: string;
  email: string;
  company: string;
  createdAt: string;
}

const CustomersPage = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchCustomers = async () => {
    try {
      setLoading(true); 
      const config = { headers: { Authorization: `Bearer ${user?.token}` } };
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/customers`, config);
      setCustomers(response.data);
    } catch (error) {
      console.error('Failed to fetch customers', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.token) {
      fetchCustomers();
    }
  }, [user?.token]);

  const handleDeleteCustomer = async (customerId: string) => {
    if (window.confirm('Are you sure you want to delete this customer?')) {
      try {
        const config = { headers: { Authorization: `Bearer ${user?.token}` } };
        await axios.delete(`${import.meta.env.VITE_API_URL}/customers/${customerId}`, config);
        setCustomers(prevCustomers => prevCustomers.filter(c => c._id !== customerId));
      } catch (error) {
        console.error('Failed to delete customer', error);
      }
    }
  };

  const filteredCustomers = customers.filter(customer =>
    (customer.name && customer.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (customer.email && customer.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (customer.company && customer.company.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <>
      <PageHeader title="Customers" subtitle="Manage your customer relationships and contact information" />
      
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <input 
            type="search" 
            placeholder="Search customers..." 
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-1/3"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            + Add Customer
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Added</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {loading ? (
                <tr><td colSpan={5} className="text-center py-4">Loading customers...</td></tr>
              ) : filteredCustomers.length > 0 ? (
                filteredCustomers.map(customer => (
                  <tr key={customer._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap"><div className="font-medium text-gray-900">{customer.name}</div><div className="text-sm text-gray-500">{customer.email}</div></td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{customer.company || 'N/A'}</td>
                    <td className="px-6 py-4 whitespace-nowrap"><span className="text-xs font-semibold text-green-600 bg-green-100 px-2 py-1 rounded-full">Active</span></td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(customer.createdAt).toLocaleDateString()}</td>
                    
                    {}
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-indigo-600 hover:text-indigo-900 mr-4">Edit</button>
                      <button 
                        onClick={() => handleDeleteCustomer(customer._id)} 
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan={5} className="text-center py-4">No customers found. Click 'Add Customer' to get started.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <AddCustomerModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onCustomerAdded={fetchCustomers} 
      />
    </>
  );
};

export default CustomersPage;