import mongoose, { Document, Schema, Types } from "mongoose";

export interface IMessage extends Document {
  userId: Types.ObjectId;
  chatId: Types.ObjectId;
  content: string;
  isAI: boolean;
  createdAt: Date;
  deletedAt: Date;
}

const MessageSchema = new Schema<IMessage>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    chatId: { type: Schema.Types.ObjectId, ref: "Chat", required: true },
    content: { type: String, required: true },
    isAI: { type: Boolean, required: true },
    deletedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

export default mongoose.model<IMessage>("Message", MessageSchema);
