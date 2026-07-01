import { StreamChat } from "stream-chat";
import { StreamClient } from "@stream-io/node-sdk";
import { ENV } from "./env.js";

const apiKey = ENV.STREAM_API_KEY;
const apiSecret = ENV.STREAM_API_SECRET;

if (!apiKey || !apiSecret) {
  // Stream credentials are required for video/chat features.
}

export const chatClient = StreamChat.getInstance(apiKey, apiSecret); //this will be used for chats
export const streamClient = new StreamClient(apiKey, apiSecret); //this will be used for video calls

export const upsertStreamUser = async (userData) => {
  try {
    await chatClient.upsertUser(userData);
  } catch {
    // Ignore Stream upsert failures.
  }
};

export const deleteStreamUser = async (userId) => {
  try {
    await chatClient.deleteUsers([userId]);
  } catch {
    // Ignore Stream deletion failures.
  }
};
