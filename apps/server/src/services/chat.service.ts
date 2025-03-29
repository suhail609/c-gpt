import { Types } from "mongoose";
import openai, { runOpenAI } from "../config/openai.config";
import Chat from "../models/chat.model";
import Message, { IMessage } from "../models/message.model";
import { MessageDTO } from "../dto/send-message.dto";
import { UserChatsDTO } from "../dto/get-user-chats.dto";
import { ChatMessagesDTO } from "../dto/get-chat-messages.dto";

export const sendMessage = async ({
  userId,
  chatId,
  content,
}: {
  userId: string;
  chatId?: string;
  content: string;
}): Promise<MessageDTO> => {
  /**
   * if chatId find the chat get the openAi thread from it
   * save user message
   * send the message to openai
   * save gpt response to message collection
   *
   * if not chatId create new chat
   * save the user message
   * create new openai thread
   * save the gpt response to message collection
   */

  const assistant = await runOpenAI();
  let chat;

  if (chatId) {
    chat = await Chat.findById(chatId);
    if (!chat) throw new Error("Chat not found");
    const newUserMessage = await Message.create({
      userId: userId,
      chatId: chat._id,
      content,
      isAI: false,
    });
  } else {
    const thread = await openai.beta.threads.create();
    chat = await Chat.create({
      userId: userId,
      openAIThreadId: thread.id,
    });
    const newUserMessage = await Message.create({
      userId: userId,
      chatId: chat._id,
      content,
      isAI: false,
    });
  }

  const message = await openai.beta.threads.messages.create(
    chat.openAIThreadId,
    {
      role: "user",
      content: content,
    }
  );

  let run = await openai.beta.threads.runs.createAndPoll(chat.openAIThreadId, {
    assistant_id: assistant.id,
    instructions: "Please address the user as Jane Doe.",
  });

  if (run.status === "completed") {
    const messages = await openai.beta.threads.messages.list(run.thread_id);

    //@ts-ignore
    let gptResponse = messages.data[0].content[0].text;

    // for (const message of messages.data.reverse()) {
    //   //@ts-ignore
    //   console.log(`${message.role} > ${message.content[0].text.value}`);
    // }

    const newAIMessage = await new Message({
      userId: userId,
      chatId: chat._id,
      content: gptResponse.value,
      isAI: true,
    }).save();

    return {
      id: newAIMessage._id.toString(),
      userId: newAIMessage.userId.toString(),
      chatId: newAIMessage.chatId.toString(),
      content: newAIMessage.content,
      isAI: newAIMessage.isAI,
      createdAt: newAIMessage.createdAt.toISOString(),
    };
  } else {
    console.log(run);
    console.error(run.status);
    throw new Error("OpenAI run failed");
  }
};

type UserChat = {
  id: string;
  userId: string;
  createdAt: string;
  lastMessage?: string;
};

export const getUserChats = async ({
  userId,
}: {
  userId: string;
}): Promise<UserChatsDTO> => {
  /**
   * get all the chat of the user from the chat
   */
  // const chats = await Chat.find({ userId: userId });

  const chats: UserChat[] = await Chat.aggregate([
    { $match: { userId: new Types.ObjectId(userId), deletedAt: null } },
    {
      $lookup: {
        from: "messages",
        localField: "_id",
        foreignField: "chatId",
        pipeline: [
          {
            $sort: { createdAt: -1 },
          },
          {
            $limit: 1,
          },
          {
            $project: {
              content: 1,
            },
          },
        ],
        as: "lastMessage",
      },
    },
    {
      $unwind: {
        path: "$lastMessage",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $project: {
        id: { $toString: "$_id" },
        userId: { $toString: "$userId" },
        lastMessage: { $ifNull: ["$lastMessage.content", null] },
        createdAt: { $toString: "$createdAt" },
      },
    },
  ]);

  return chats;
};

export const getChatMessages = async ({
  chatId,
}: {
  chatId: string;
}): Promise<ChatMessagesDTO> => {
  /**
   * get all the messages of the chat with chatId
   */

  try {
    const messages = await Message.find({ chatId: chatId, deletedAt: null })
      .sort({
        createdAt: 1,
      })
      .select("-deletedAt")
      .lean();

    return messages.map((message) => ({
      id: message._id.toString(),
      userId: message.userId.toString(),
      chatId: message.chatId.toString(),
      content: message.content,
      isAI: message.isAI,
      createdAt: message.createdAt.toISOString(),
    }));
  } catch (error) {
    console.error("Error fetching chat messages: ", error);
    throw error;
  }
};
