import React, { useState, useEffect, useCallback, useRef } from "react";
import io, { Socket } from "socket.io-client";
import { useNotification } from "../../hook/notify";
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";
import { Send, Paperclip, ChevronDown, ChevronUp } from "react-feather";
import { Avatar } from "antd";

// Interface definitions
interface Message {
  id?: string;
  sender: string;
  receiver: string;
  message: string;
  timestamp?: number;
  status?: "sending" | "sent" | "delivered" | "read";
}

interface User {
  id: string;
  name?: string;
  avatar?: string;
  status?: "online" | "offline" | "away";
  lastSeen?: number;
}

interface ChatSocketProps {
  senderId: string;
  receiverId: string | null;
  receiverInfo?: User;
  onMinimize?: () => void;
  isMinimized?: boolean;
  className?: string;
}

const ChatSocket: React.FC<ChatSocketProps> = ({
  senderId,
  receiverId,
  receiverInfo,
  onMinimize,
  isMinimized = false,
  className = "",
}) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentMessage, setCurrentMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSending, setIsSending] = useState<boolean>(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messageInputRef = useRef<HTMLInputElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const { notify } = useNotification();

  // Get socket URL from environment or use current location
  const socketUrl = `${window.location.protocol}//${window.location.hostname}:8080`;

  // Auto-scroll to the latest message
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Initialize socket connection
  useEffect(() => {
    if (!senderId) return;

    const newSocket = io(socketUrl, {
      transports: ["websocket"],
      reconnection: true,
      reconnectionAttempts: 10,
      reconnectionDelay: 1000,
      query: { userId: senderId },
    });

    // Connection event handlers
    newSocket.on("connect", () => {
      console.log("Chat socket connected successfully");
      newSocket.emit("join", senderId);
      setIsLoading(false);
    });

    newSocket.on("connect_error", (error) => {
      console.error("Socket connection error:", error);
      notify("error", { message: "Lỗi kết nối chat. Đang thử kết nối lại..." });
      setIsLoading(true);
    });

    // Message event handlers
    newSocket.on("receiveMessage", (message: Message) => {
      if (message.sender === senderId || message.receiver === senderId) {
        setMessages((prevMessages) => {
          // Avoid duplicate messages
          const exists = prevMessages.some(
            (msg) =>
              msg.id === message.id ||
              (msg.timestamp === message.timestamp &&
                msg.sender === message.sender &&
                msg.message === message.message)
          );

          if (exists) return prevMessages;
          return [...prevMessages, message];
        });

        // Acknowledge message receipt if we are the receiver
        if (message.sender !== senderId) {
          newSocket.emit("messageRead", message.id);
        }

        scrollToBottom();
      }
    });

    newSocket.on("allMessages", (receivedMessages: Message[]) => {
      console.log("Loaded chat history:", receivedMessages.length, "messages");
      if (Array.isArray(receivedMessages)) {
        setMessages(receivedMessages);
        setTimeout(scrollToBottom, 100);
      } else {
        console.error("Invalid message data:", receivedMessages);
        setMessages([]);
      }
      setIsLoading(false);
    });

    newSocket.on("messageStatus", ({ messageId, status }) => {
      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg.id === messageId ? { ...msg, status } : msg
        )
      );
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [senderId, socketUrl]);

  // Load message history when receiver changes
  useEffect(() => {
    if (socket && senderId && receiverId) {
      setIsLoading(true);
      console.log(
        "Loading message history between:",
        senderId,
        "and",
        receiverId
      );
      socket.emit("loadMessages", [senderId, receiverId]);
    }
  }, [socket, receiverId, senderId]);

  // Handle message sending
  const sendMessage = useCallback(() => {
    if (socket && currentMessage.trim() && receiverId) {
      setIsSending(true);

      // Generate temporary ID for local tracking
      const tempId = `temp-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

      const messagePayload: Message = {
        id: tempId,
        sender: senderId,
        receiver: receiverId,
        message: currentMessage.trim(),
        timestamp: Date.now(),
        status: "sending",
      };

      // Add message to local state immediately for responsive UI
      setMessages((prevMessages) => [...prevMessages, messagePayload]);

      // Send to server
      socket.emit(
        "sendMessage",
        messagePayload,
        (acknowledgement: { success: boolean; messageId: string }) => {
          setIsSending(false);

          if (acknowledgement && acknowledgement.success) {
            // Update the temporary message with the server-generated ID
            setMessages((prevMessages) =>
              prevMessages.map((msg) =>
                msg.id === tempId
                  ? { ...msg, id: acknowledgement.messageId, status: "sent" }
                  : msg
              )
            );
          } else {
            // Handle failure
            notify("error", {
              message: "Không thể gửi tin nhắn. Vui lòng thử lại.",
            });
            // setMessages(prevMessages =>
            //   prevMessages.map(msg =>
            //     msg.id === tempId ?
            //       { ...msg, status: "error" } :
            //       msg
            //   )
            // );
          }
        }
      );

      setCurrentMessage("");
      setTimeout(scrollToBottom, 100);
    }
  }, [socket, currentMessage, senderId, receiverId]);

  // Form submission handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage();
    messageInputRef.current?.focus();
  };

  // Message grouping by date
  const groupMessagesByDate = (messages: Message[]) => {
    const groups: { [date: string]: Message[] } = {};

    messages.forEach((message) => {
      const date = message.timestamp
        ? new Date(message.timestamp).toLocaleDateString()
        : "Unknown Date";

      if (!groups[date]) {
        groups[date] = [];
      }

      groups[date].push(message);
    });

    return groups;
  };

  // Format message time
  const formatMessageTime = (timestamp?: number) => {
    if (!timestamp) return "";

    const date = new Date(timestamp);
    const now = new Date();
    const isToday = date.toDateString() === now.toDateString();

    if (isToday) {
      return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    }

    return formatDistanceToNow(date, { locale: vi, addSuffix: true });
  };

  // Get message groups for display
  const messageGroups = groupMessagesByDate(messages);
  const chatHeaderName = receiverInfo?.name || receiverId || "Chat";

  // Handle keyboard shortcuts
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div
      ref={chatContainerRef}
      className={`chat-socket flex flex-col ${
        isMinimized ? "h-12" : "h-96"
      } w-80 fixed bottom-4 right-4 bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 ${className}`}
    >
      {/* Chat Header */}
      <div
        className="chat-header flex justify-between items-center p-3 bg-blue-600 text-white cursor-pointer"
        onClick={onMinimize}
      >
        <div className="flex items-center space-x-2">
          {receiverInfo?.avatar ? (
            <Avatar
              src={receiverInfo.avatar}
              alt={receiverInfo.name || "User"}
              className="w-8 h-8"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-blue-400 flex items-center justify-center text-white font-semibold">
              {chatHeaderName.charAt(0).toUpperCase()}
            </div>
          )}
          <div className="flex flex-col">
            <span className="font-medium text-sm">{chatHeaderName}</span>
            {receiverInfo?.status && (
              <span className="text-xs opacity-80">
                {receiverInfo.status === "online"
                  ? "Đang hoạt động"
                  : receiverInfo.lastSeen
                  ? `Hoạt động ${formatDistanceToNow(
                      new Date(receiverInfo.lastSeen),
                      { locale: vi, addSuffix: true }
                    )}`
                  : "Không hoạt động"}
              </span>
            )}
          </div>
        </div>
        <button className="focus:outline-none">
          {isMinimized ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>
      </div>

      {/* Chat Messages Area - Only show when not minimized */}
      {!isMinimized && (
        <div className="messages-container flex-grow p-3 overflow-y-auto bg-gray-50">
          {isLoading ? (
            <div className="flex justify-center items-center h-full">
              <div className="animate-pulse flex space-x-2">
                <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
              </div>
            </div>
          ) : messages.length > 0 ? (
            Object.entries(messageGroups).map(([date, msgs]) => (
              <div key={date} className="message-group mb-4">
                <div className="date-separator flex items-center my-2">
                  <div className="flex-grow h-px bg-gray-200"></div>
                  <span className="px-2 text-xs text-gray-500">{date}</span>
                  <div className="flex-grow h-px bg-gray-200"></div>
                </div>

                {msgs.map((msg, idx) => {
                  const isSender = msg.sender === senderId;
                  const showAvatar =
                    !isSender &&
                    (idx === 0 || msgs[idx - 1]?.sender !== msg.sender);

                  return (
                    <div
                      key={msg.id || idx}
                      className={`message-wrapper flex ${
                        isSender ? "justify-end" : "justify-start"
                      } mb-2`}
                    >
                      {!isSender && showAvatar && (
                        <div className="flex-shrink-0 mr-2">
                          {/* {receiverInfo?.avatar ? (
                            <Avatar
                              src={receiverInfo.avatar}
                              alt={receiverInfo.name || "User"}
                              className="w-8 h-8"
                            />
                          ) : (
                            <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-white">
                              {(receiverInfo?.name || receiverId || "?")
                                .charAt(0)
                                .toUpperCase()}
                            </div>
                          )} */}
                        </div>
                      )}

                      <div
                        className={`message ${
                          isSender ? "sender" : "receiver"
                        } max-w-[70%]`}
                      >
                        <div
                          className={`message-bubble px-3 py-2 rounded-lg text-sm 
                            ${
                              isSender
                                ? "bg-blue-600 text-white rounded-br-none"
                                : "bg-gray-200 text-gray-800 rounded-bl-none"
                            }`}
                        >
                          {msg.message}
                        </div>
                        <div
                          className={`message-meta text-xs mt-1 flex items-center ${
                            isSender ? "justify-end" : "justify-start"
                          }`}
                        >
                          <span
                            className={`time ${
                              isSender ? "text-gray-500" : "text-gray-500"
                            }`}
                          >
                            {formatMessageTime(msg.timestamp)}
                          </span>
                          {isSender && (
                            <span className="status ml-1">
                              {msg.status === "sending" && (
                                <span className="text-gray-400">•</span>
                              )}
                              {msg.status === "sent" && (
                                <span className="text-gray-400">✓</span>
                              )}
                              {msg.status === "delivered" && (
                                <span className="text-blue-400">✓✓</span>
                              )}
                              {msg.status === "read" && (
                                <span className="text-blue-600">✓✓</span>
                              )}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <p className="text-sm mb-2">Chưa có tin nhắn nào</p>
              <p className="text-xs">Bắt đầu cuộc trò chuyện ngay!</p>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      )}

      {/* Message Input Area - Only show when not minimized */}
      {!isMinimized && (
        <form
          onSubmit={handleSubmit}
          className="message-form p-2 border-t border-gray-200 bg-white"
        >
          <div className="flex items-center space-x-2">
            <button
              type="button"
              className="p-2 rounded-full text-gray-500 hover:bg-gray-100 focus:outline-none"
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            >
              {/* <EmojiSmile size={18} /> */} =)))
            </button>

            <button
              type="button"
              className="p-2 rounded-full text-gray-500 hover:bg-gray-100 focus:outline-none"
            >
              <Paperclip size={18} />
            </button>

            <input
              ref={messageInputRef}
              type="text"
              className="flex-grow p-2 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={
                receiverId ? "Nhập tin nhắn..." : "Chọn người nhận..."
              }
              disabled={!receiverId || isLoading}
            />

            <button
              type="submit"
              className={`p-2 rounded-full ${
                currentMessage.trim() && receiverId
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              } focus:outline-none`}
              disabled={
                !receiverId || !currentMessage.trim() || isLoading || isSending
              }
            >
              <Send size={18} />
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ChatSocket;
