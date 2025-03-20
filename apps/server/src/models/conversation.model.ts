import mongoose, { Document, Schema } from "mongoose";

export interface IConversation extends Document {
  user: string;
  messages: { role: "user" | "assistant"; content: string }[];
  createdAt: Date;
  deletedAt: Date | null;
}

const ConversationSchema = new Schema<IConversation>(
  {
    user: { type: String, required: true },
    messages: [
      {
        role: { type: String, enum: ["user", "assistant"], required: true },
        content: { type: String, required: true },
      },
    ],
    deletedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

export default mongoose.model<IConversation>(
  "Conversation",
  ConversationSchema
);
