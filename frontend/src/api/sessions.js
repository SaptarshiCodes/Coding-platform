import axiosInstance from "../lib/axios";

const requireSessionPayload = (data, fallbackMessage) => {
  if (!data?.session?._id) {
    throw new Error(data?.message || fallbackMessage);
  }

  return data;
};

export const sessionApi = {
  createSession: async (data) => {
    const response = await axiosInstance.post("/sessions", data);
    return requireSessionPayload(
      response.data,
      "Session was not created. Please sign in again.",
    );
  },

  getActiveSessions: async () => {
    const response = await axiosInstance.get("/sessions/active");
    return response.data;
  },

  getMyRecentSessions: async () => {
    const response = await axiosInstance.get("/sessions/my-recent");
    return response.data;
  },

  getSessionById: async (id) => {
    const response = await axiosInstance.get(`/sessions/${id}`);
    return response.data;
  },

  joinSession: async (id) => {
    const response = await axiosInstance.post(`/sessions/${id}/join`);
    return requireSessionPayload(response.data, "Failed to join session");
  },

  endSession: async (id) => {
    const response = await axiosInstance.post(`/sessions/${id}/end`);
    return requireSessionPayload(response.data, "Failed to end session");
  },

  getStreamToken: async () => {
    const response = await axiosInstance.get("/chat/token");
    return response.data;
  },
};
