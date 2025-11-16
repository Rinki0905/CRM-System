import { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import type { RootState } from '../app/store';
import AddTaskModal from '../components/tasks/AddTaskModal';

interface Task {
  _id: string;
  title: string;
  description: string;
  dueDate: string;
  isCompleted: boolean;
}
type FilterStatus = 'All' | 'Pending' | 'Completed';

const TasksPage = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState<FilterStatus>('All');

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const config = { headers: { Authorization: `Bearer ${user?.token}` } };
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/tasks`, config);
      setTasks(data);
    } catch (error) { console.error('Failed to fetch tasks', error); } 
    finally { setLoading(false); }
  };

  useEffect(() => { if (user?.token) fetchTasks(); }, [user?.token]);

  const handleToggleComplete = async (task: Task) => {
    try {
        const config = { headers: { Authorization: `Bearer ${user?.token}` } };
        const updatedTask = { ...task, isCompleted: !task.isCompleted };
        await axios.put(`${import.meta.env.VITE_API_URL}/tasks/${task._id}`, updatedTask, config);
        setTasks(tasks.map(t => t._id === task._id ? updatedTask : t));
    } catch (error) { console.error('Failed to update task', error); }
  };
  
  const handleDeleteTask = async (taskId: string) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        const config = { headers: { Authorization: `Bearer ${user?.token}` } };
        await axios.delete(`${import.meta.env.VITE_API_URL}/tasks/${taskId}`, config);
        setTasks(prevTasks => prevTasks.filter(task => task._id !== taskId));
      } catch (error) {
        console.error('Failed to delete task', error);
        alert('Failed to delete task.');
      }
    }
  };

  const filteredTasks = useMemo(() => {
    if (filter === 'Pending') return tasks.filter(task => !task.isCompleted);
    if (filter === 'Completed') return tasks.filter(task => task.isCompleted);
    return tasks;
  }, [tasks, filter]);

  const renderContent = () => {
    if (loading) return <p className="text-center py-10">Loading tasks...</p>;
    if (tasks.length === 0) {
      return (
        <div className="text-center py-20">
          <div className="text-5xl mb-4">📋</div>
          <h2 className="text-2xl font-semibold mb-2">No tasks found</h2>
          <p className="text-gray-500 mb-6">Get started by creating your first task</p>
          <button onClick={() => setIsModalOpen(true)} className="bg-blue-600 text-white font-semibold px-5 py-2 rounded-lg hover:bg-blue-700">
            + Add First Task
          </button>
        </div>
      );
    }
    return (
      <ul className="space-y-4">
        {filteredTasks.map(task => (
          <li key={task._id} className="bg-white p-4 rounded-lg shadow-sm flex items-center justify-between">
            <div className="flex items-center">
              <input type="checkbox" checked={task.isCompleted} onChange={() => handleToggleComplete(task)} className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
              <div className="ml-4">
                <p className={`font-medium ${task.isCompleted ? 'line-through text-gray-500' : 'text-gray-900'}`}>{task.title}</p>
                <p className="text-sm text-gray-500">Due: {new Date(task.dueDate).toLocaleDateString()}</p>
              </div>
            </div>
            <button 
              onClick={() => handleDeleteTask(task._id)}
              className="p-2 text-gray-400 hover:text-red-600 rounded-full"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </li>
        ))}
      </ul>
    );
  };
  
  return (
    <>
      
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div className="flex flex-wrap gap-2">
          {['All', 'Pending', 'Completed'].map((status) => (
            <button 
              key={status} 
              onClick={() => setFilter(status as FilterStatus)} 
              className={`px-4 py-1 rounded-full text-sm font-semibold ${
                filter === status 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
        <button 
          onClick={() => setIsModalOpen(true)} 
          className="bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-blue-700 w-full md:w-auto"
        >
          + Add Task
        </button>
      </div>
      
      {renderContent()}

      <AddTaskModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onTaskAdded={fetchTasks} />
    </>
  );
};

export default TasksPage;