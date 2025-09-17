import mongoose, { Schema, Document, Types } from 'mongoose';

export interface ITask extends Document {
  user: Types.ObjectId;
  title: string;
  description: string;
  dueDate: Date;
  isCompleted: boolean;
}

const TaskSchema: Schema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String },
  dueDate: { type: Date, required: true },
  isCompleted: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.model<ITask>('Task', TaskSchema);