import * as mongoose from 'mongoose';
import { ObjectId } from 'mongoose';

export const DeviceSchema = new mongoose.Schema({
  deviceId: String,
  userId: String,
  detail: String,
  isActive: Boolean,
  isDeleted: Boolean,
  isBlocked: Boolean,
  createdAt: String,
  updatedAt: String,
});
