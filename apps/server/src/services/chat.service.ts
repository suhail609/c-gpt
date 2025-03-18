import { Types } from "mongoose";
import openai, { runOpenAI } from "../config/openai.config";
import Chat from "../models/chat.model";
import Message from "../models/message.model";

export const sendMessage = async ({
  userId,
  chatId,
  content,
}: {
  userId: string;
  chatId?: string;
  content: string;
}) => {
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
    let response = messages.data[0].content[0].text;

    // for (const message of messages.data.reverse()) {
    //   //@ts-ignore
    //   console.log(`${message.role} > ${message.content[0].text.value}`);
    // }

    const newAIMessage = await Message.create({
      userId: userId,
      chatId: chat._id,
      content: response.value,
      isAI: true,
    });

    return response;
  } else {
    console.log(run);
    console.error(run.status);
    throw new Error("OpenAI run failed");
  }
};

export const getUserChats = async ({ userId }: { userId: string }) => {
  /**
   * get all the chat of the user from the chat
   */
  // const chats = await Chat.find({ userId: userId });
  const chats = await Chat.aggregate([
    { $match: { userId: new Types.ObjectId(userId) } },
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
  ]);
  return chats;
};

export const getChatMessages = async ({ chatId }: { chatId: string }) => {
  /**
   * get all the messages of the chat with chatId
   */
  const messages = await Message.find({ chatId: chatId }).sort({
    createdAt: 1,
  });
  return messages;
};
