import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import type { RootState } from '../app/store';
import AddDealModal from '../components/deals/AddDealModal';
import { DndContext, type DragEndEvent, closestCorners } from '@dnd-kit/core';
import Column from '../components/deals/Column.tsx'; 

export interface Deal {
  _id: string;
  title: string;
  value: number;
  stage: string;
  customer: { _id: string; name: string };
}
export type Columns = { [key: string]: Deal[] };

const dealStages = ['Lead', 'Contacted', 'Proposal', 'Won', 'Lost'];

const DealsPage = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [deals, setDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchDeals = async () => {
    try {
      setLoading(true);
      const config = { headers: { Authorization: `Bearer ${user?.token}` } };
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/deals`, config);
      setDeals(data);
    } catch (error) {
      console.error('Failed to fetch deals', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.token) fetchDeals();
  }, [user?.token]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const originalStage = active.data.current?.stage;
    const newStage = over.id as string;

    if (originalStage !== newStage) {
      // Optimistic UI update
      setDeals(prevDeals => {
        const activeDealIndex = prevDeals.findIndex(d => d._id === active.id);
        if (activeDealIndex === -1) return prevDeals;
        const updatedDeals = [...prevDeals];
        updatedDeals[activeDealIndex] = { ...updatedDeals[activeDealIndex], stage: newStage };
        return updatedDeals;
      });
      // API call
      const config = { headers: { Authorization: `Bearer ${user?.token}` } };
      axios.put(`${import.meta.env.VITE_API_URL}/deals/${active.id}`, { stage: newStage }, config)
        .catch(err => {
          console.error("Failed to update deal stage", err);
          // Revert on failure
          setDeals(prevDeals => {
            const activeDealIndex = prevDeals.findIndex(d => d._id === active.id);
            if (activeDealIndex === -1) return prevDeals;
            const revertedDeals = [...prevDeals];
            revertedDeals[activeDealIndex] = { ...revertedDeals[activeDealIndex], stage: originalStage };
            return revertedDeals;
          });
        });
    }
  };

  if (loading) return <p>Loading deals...</p>;

  return (
    <>
      {deals.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-5xl mb-4">🤝</div>
          <h2 className="text-2xl font-semibold mb-2">No deals found</h2>
          <p className="text-gray-500 mb-6">Get started by creating your first deal</p>
          <button onClick={() => setIsModalOpen(true)} className="bg-blue-600 text-white font-semibold px-5 py-2 rounded-lg hover:bg-blue-700">
            + Add First Deal
          </button>
        </div>
      ) : (
        <>
          <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
            <h2 className="text-xl font-semibold">All Deals</h2>
            <button onClick={() => setIsModalOpen(true)} className="bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-blue-700 w-full md:w-auto">
              + Add Deal
            </button>
          </div>
          <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCorners}>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5">
              {dealStages.map(stage => (
                <Column 
                  key={stage} 
                  id={stage} 
                  title={stage} 
                  deals={deals.filter(deal => deal.stage === stage)}
                />
              ))}
            </div>
          </DndContext>
        </>
      )}

      <AddDealModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onDealAdded={fetchDeals} />
    </>
  );
};

export default DealsPage;