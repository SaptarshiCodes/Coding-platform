import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { sessionApi } from "../api/sessions";

export const useCreateSession = () => {
  const result = useMutation({
    mutationKey: ["createSession"],
    mutationFn: sessionApi.createSession,
    onSuccess: () => toast.success("Session created successfully!"),
    onError: (error) =>
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Failed to create room",
      ),
  });

  return result;
};

export const useActiveSessions = () => {
  const result = useQuery({
    queryKey: ["activeSessions"],
    queryFn: sessionApi.getActiveSessions,
    refetchOnWindowFocus: true,
    refetchOnMount: "always",
  });
  return result;
};

export const useMyRecentSessions = () => {
  const result = useQuery({
    queryKey: ["myRecentSessions"],
    queryFn: sessionApi.getMyRecentSessions,
    refetchOnWindowFocus: true,
    refetchOnMount: "always",
  });
  return result;
};

export const useSessionById = (id) => {
  const result = useQuery({
    queryKey: ["session", id],
    queryFn: () => sessionApi.getSessionById(id),
    enabled: !!id,
    refetchInterval: 5000,
  });
  return result;
};

export const useJoinSession = () => {
  const result = useMutation({
    mutationKey: ["joinSession"],
    mutationFn: sessionApi.joinSession,
    onSuccess: () => toast.success("Joined session successfully!"),
    onError: (error) =>
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Failed to join session",
      ),
  });

  return result;
};

export const useEndSession = () => {
  const queryClient = useQueryClient();

  const result = useMutation({
    mutationKey: ["endSession"],
    mutationFn: sessionApi.endSession,
    onSuccess: (data, id) => {
      toast.success("Session ended successfully!");

      queryClient.setQueryData(["myRecentSessions"], (oldData) => {
        const existingSessions = oldData?.sessions || [];
        const alreadyIncluded = existingSessions.some(
          (session) => session._id === data.session._id,
        );

        if (alreadyIncluded) {
          return {
            ...oldData,
            sessions: existingSessions.map((session) =>
              session._id === data.session._id ? data.session : session,
            ),
          };
        }

        return {
          ...oldData,
          sessions: [data.session, ...existingSessions],
        };
      });

      queryClient.setQueryData(["activeSessions"], (oldData) => ({
        ...oldData,
        sessions: (oldData?.sessions || []).filter(
          (session) => session._id !== id,
        ),
      }));

      queryClient.setQueryData(["session", id], { session: data.session });
      queryClient.invalidateQueries({ queryKey: ["myRecentSessions"] });
      queryClient.invalidateQueries({ queryKey: ["activeSessions"] });
    },
    onError: (error) =>
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Failed to end session",
      ),
  });

  return result;
};
