import mongoose, { Schema, Document, Types } from "mongoose";

export interface IChat extends Document {
  userId: Types.ObjectId;
  openAIThreadId: string;
  createdAt: Date;
}

const ChatSchema = new Schema<IChat>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    openAIThreadId: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IChat>("Chat", ChatSchema);
