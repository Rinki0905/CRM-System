import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import type { RootState } from '../app/store';
import PageHeader from '../components/layout/PageHeader';
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
            {}
          </li>
        ))}
      </ul>
    );
  };
  
  return (
    <>
      <PageHeader title="Tasks" subtitle="Manage your tasks, deadlines, and follow-ups" />
      <div className="flex justify-between items-center mb-6">
        <div>
          <span className="font-semibold mr-4">All Tasks</span>
          {['All', 'Pending', 'Completed'].map((status) => (
            <button key={status} onClick={() => setFilter(status as FilterStatus)} className={`px-4 py-1 rounded-full text-sm font-semibold ${filter === status ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}>
              {status}
            </button>
          ))}
        </div>
        <button onClick={() => setIsModalOpen(true)} className="bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-blue-700">
          + Add Task
        </button>
      </div>
      
      {renderContent()}

      <AddTaskModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onTaskAdded={fetchTasks} />
    </>
  );
};

export default TasksPage;