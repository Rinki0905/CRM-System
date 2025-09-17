import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { Deal } from '../../pages/DealsPage';

interface SortableDealCardProps {
  deal: Deal;
}

const SortableDealCard: React.FC<SortableDealCardProps> = ({ deal }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: deal._id, data: { stage: deal.stage } });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="bg-white p-4 rounded-md shadow-sm border cursor-grab">
      <p className="font-semibold text-sm">{deal.title}</p>
       <p className="text-xs text-gray-500">
        {deal.customer?.name || 'No Customer Assigned'}
      </p>
      <p className="text-sm font-bold mt-2">${deal.value.toLocaleString()}</p>
    </div>
  );
};

export default SortableDealCard;