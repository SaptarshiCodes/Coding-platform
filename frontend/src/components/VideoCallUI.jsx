import {
  CallControls,
  CallingState,
  SpeakerLayout,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";

import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";

import { Loader2Icon, MessageSquareIcon, UsersIcon, XIcon } from "lucide-react";

import { useState } from "react";
import { useNavigate } from "react-router";

import {
  Channel,
  Chat,
  MessageInput,
  MessageList,
  Thread,
  Window,
} from "stream-chat-react";

import "@stream-io/video-react-sdk/dist/css/styles.css";
import "stream-chat-react/dist/css/v2/index.css";

function VideoCallUI({ chatClient, channel }) {
  const navigate = useNavigate();

  const { useCallCallingState, useParticipantCount } = useCallStateHooks();

  const callingState = useCallCallingState();
  const participantCount = useParticipantCount();

  const [isChatOpen, setIsChatOpen] = useState(false);

  if (callingState === CallingState.JOINING) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <Loader2Icon className="w-12 h-12 mx-auto animate-spin text-primary mb-4" />
          <p className="text-lg">Joining call...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="h-full relative str-video">
        <PanelGroup direction="horizontal">
          {/* ================= VIDEO PANEL ================= */}

          <Panel defaultSize={60} minSize={20}>
            <div className="h-full min-h-0 flex flex-col gap-3">
              {/* Header */}
              <div className="flex items-center justify-between gap-2 bg-base-100 p-3 rounded-lg shadow">
                <div className="flex items-center gap-2">
                  <UsersIcon className="w-5 h-5 text-primary" />

                  <span className="font-semibold">
                    {participantCount}{" "}
                    {participantCount === 1 ? "participant" : "participants"}
                  </span>
                </div>

                {chatClient && channel && (
                  <button
                    onClick={() => setIsChatOpen(!isChatOpen)}
                    className={`btn btn-sm gap-2 ${
                      isChatOpen ? "btn-primary" : "btn-ghost"
                    }`}
                  >
                    <MessageSquareIcon className="size-4" />
                    {isChatOpen ? "Hide Chat" : "Show Chat"}
                  </button>
                )}
              </div>

              {/* Video */}
              <div className="flex-1 min-h-0 bg-base-300 rounded-lg overflow-hidden relative">
                <SpeakerLayout />
              </div>

              {/* Call Controls */}
              <div className="bg-base-100 rounded-lg shadow p-3 flex justify-center">
                <CallControls onLeave={() => navigate("/dashboard")} />
              </div>
            </div>
          </Panel>

          {/* Resize Handle */}

          {chatClient && channel && isChatOpen && (
            <PanelResizeHandle className="w-1 rounded-full bg-base-300 hover:bg-primary transition-colors cursor-col-resize" />
          )}

          {/* ================= CHAT PANEL ================= */}
          {chatClient && channel && isChatOpen && (
            <Panel defaultSize={40} minSize={20} maxSize={45}>
              <div className="h-full min-h-0 flex flex-col rounded-lg overflow-hidden shadow bg-[#272a30]">
                {/* Chat Header */}
                <div className="bg-[#1c1e22] p-3 border-b border-[#3a3d44] flex items-center justify-between">
                  <h3 className="font-semibold text-white">Session Chat</h3>

                  <button
                    onClick={() => setIsChatOpen(false)}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <XIcon className="size-5" />
                  </button>
                </div>

                {/* Chat Body */}
                <div className="flex-1 min-h-0 overflow-hidden stream-chat-dark">
                  <Chat client={chatClient} theme="str-chat__theme-dark">
                    <Channel channel={channel}>
                      <Window>
                        <MessageList />
                        <MessageInput />
                      </Window>

                      <Thread />
                    </Channel>
                  </Chat>
                </div>
              </div>
            </Panel>
          )}
        </PanelGroup>
      </div>

      {/* ================= MOBILE CHAT DRAWER ================= */}

      {chatClient && channel && isChatOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 md:hidden">
          <div className="absolute right-0 top-0 h-full w-full max-w-sm bg-[#272a30] shadow-2xl flex flex-col">
            <div className="bg-[#1c1e22] p-3 border-b border-[#3a3d44] flex items-center justify-between">
              <h3 className="font-semibold text-white">Session Chat</h3>

              <button
                onClick={() => setIsChatOpen(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <XIcon className="size-5" />
              </button>
            </div>

            <div className="flex-1 min-h-0 overflow-hidden stream-chat-dark">
              <Chat client={chatClient} theme="str-chat__theme-dark">
                <Channel channel={channel}>
                  <Window>
                    <MessageList />
                    <MessageInput />
                  </Window>

                  <Thread />
                </Channel>
              </Chat>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default VideoCallUI;
