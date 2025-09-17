
import mongoose, { Schema, Document, Types } from 'mongoose';

export interface ICustomer extends Document {
  user: Types.ObjectId;
  name: string;
  email: string;
  phone: string;
  company: string;
  notes: {
    content: string;
    date: Date;
  }[];
}

const CustomerSchema: Schema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  company: { type: String },
  notes: [{
    content: { type: String },
    date: { type: Date, default: Date.now },
  }],
}, { timestamps: true });

export default mongoose.model<ICustomer>('Customer', CustomerSchema);