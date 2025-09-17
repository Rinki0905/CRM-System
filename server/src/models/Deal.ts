import mongoose, { Schema, Document, Types } from 'mongoose';

export type DealStage = 'Lead' | 'Contacted' | 'Proposal' | 'Won' | 'Lost';

export interface IDeal extends Document {
  user: Types.ObjectId;
  customer: Types.ObjectId;
  title: string;
  value: number;
  stage: DealStage;
}

const DealSchema: Schema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  customer: { type: Schema.Types.ObjectId, ref: 'Customer', required: true },
  title: { type: String, required: true },
  value: { type: Number, required: true },
  stage: {
    type: String,
    enum: ['Lead', 'Contacted', 'Proposal', 'Won', 'Lost'],
    default: 'Lead',
  },
}, { timestamps: true });

export default mongoose.model<IDeal>('Deal', DealSchema);