import mongoose, { Document, Schema, Types } from "mongoose";

export interface IChat extends Document {
  userId: Types.ObjectId;
  openAIThreadId: string;
  createdAt: Date;
  deletedAt: Date | null;
}

const ChatSchema = new Schema<IChat>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    openAIThreadId: { type: String, required: true },
    deletedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

export default mongoose.model<IChat>("Chat", ChatSchema);
