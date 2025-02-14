import { useState, useEffect, useCallback } from "react";
import { Socket } from "socket.io-client";
import { SocketService } from "../services/socket";

export interface Message {
  id: string;
  content: string;
  senderId: string;
  receiverId: string;
  status: MessageStatus;
  createdAt: Date;
  recalledAt?: Date;
}

export enum MessageStatus {
  SENT = "SENT",
  READ = "READ",
  RECALLED = "RECALLED",
}

export const useChat = (userId: string) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [onlineUsers, setOnlineUsers] = useState<Set<string>>(new Set());
  const socket: Socket = SocketService.getInstance().getSocket();

  useEffect(() => {
    // Load initial messages
    socket.emit("loadMessages");

    // Set up event listeners
    socket.on("allMessages", (loadedMessages: Message[]) => {
      setMessages(loadedMessages);
    });

    socket.on("newMessage", (message: Message) => {
      setMessages((prev) => [...prev, message]);
    });

    socket.on("messageRecalled", (recalledMessage: Message) => {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === recalledMessage.id ? recalledMessage : msg
        )
      );
    });

    socket.on("messageRead", (readMessage: Message) => {
      setMessages((prev) =>
        prev.map((msg) => (msg.id === readMessage.id ? readMessage : msg))
      );
    });

    socket.on("userStatus", ({ userId, isOnline }) => {
      setOnlineUsers((prev) => {
        const newSet = new Set(prev);
        if (isOnline) {
          newSet.add(userId);
        } else {
          newSet.delete(userId);
        }
        return newSet;
      });
    });

    return () => {
      socket.off("allMessages");
      socket.off("newMessage");
      socket.off("messageRecalled");
      socket.off("messageRead");
      socket.off("userStatus");
    };
  }, [socket]);

  const sendMessage = useCallback(
    (receiverId: string, content: string) => {
      return new Promise<Message>((resolve, reject) => {
        socket.emit(
          "sendMessage",
          { receiverId, content },
          (response: Message) => {
            if (response) {
              resolve(response);
            } else {
              reject(new Error("Failed to send message"));
            }
          }
        );
      });
    },
    [socket]
  );

  const recallMessage = useCallback(
    (messageId: string) => {
      return new Promise<Message>((resolve, reject) => {
        socket.emit("recallMessage", messageId, (response: Message) => {
          if (response) {
            resolve(response);
          } else {
            reject(new Error("Failed to recall message"));
          }
        });
      });
    },
    [socket]
  );

  const markAsRead = useCallback(
    (messageId: string) => {
      return new Promise<Message>((resolve, reject) => {
        socket.emit("markAsRead", messageId, (response: Message) => {
          if (response) {
            resolve(response);
          } else {
            reject(new Error("Failed to mark message as read"));
          }
        });
      });
    },
    [socket]
  );

  return {
    messages,
    onlineUsers,
    sendMessage,
    recallMessage,
    markAsRead,
  };
};
