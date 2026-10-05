import mongoose from 'mongoose';

const logSchema = new mongoose.Schema(
  {
    level: { type: String, enum: ['info', 'warn', 'error'], required: true },
    message: { type: String, required: true, trim: true },
    method: { type: String, required: true, uppercase: true },
    path: { type: String, required: true },
    ip: { type: String, default: null },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
    username: { type: String, default: null },
    statusCode: { type: Number, required: true },
    metadata: { type: mongoose.Schema.Types.Mixed, default: {} },
  },
  { timestamps: true, collection: 'logs' },
);

logSchema.index({ createdAt: -1 }, { name: 'latest_audit_logs' });
logSchema.index({ userId: 1, createdAt: -1 }, { name: 'audit_logs_by_user' });
logSchema.index({ statusCode: 1, createdAt: -1 }, { name: 'audit_logs_by_status' });

export default mongoose.model('Log', logSchema);
