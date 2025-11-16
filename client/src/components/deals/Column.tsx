import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import type { Deal } from '../../pages/DealsPage';
import SortableDealCard from './SortableDealCard.tsx';

interface ColumnProps {
  id: string;
  title: string;
  deals: Deal[];
}

const Column: React.FC<ColumnProps> = ({ id, title, deals }) => {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div className="p-4 rounded-lg bg-gray-100">
      <h3 className="font-semibold mb-4">{title} ({deals.length})</h3>
      <SortableContext id={id} items={deals.map(d => d._id)} strategy={verticalListSortingStrategy}>
        <div ref={setNodeRef} className="space-y-3 min-h-[400px]">
          {deals.map(deal => (
            <SortableDealCard 
              key={deal._id} 
              deal={deal} 
            />
          ))}
        </div>
      </SortableContext>
    </div>
  );
};

export default Column;