import React, { useState, useEffect, useCallback } from "react";
import io, { Socket } from "socket.io-client";
import { useNotification } from "../../hook/notify";
import { friendService } from "../../services/friend";

// Định nghĩa kiểu cho tin nhắn
interface Message {
  sender: string;
  receiver: string;
  message: string;
  timestamp?: number;
}

// Định nghĩa props cho component
interface ChatSocketProps {
  senderId: string;
}

const ChatSocket: React.FC<ChatSocketProps> = ({ senderId }) => {
  // State để quản lý socket, tin nhắn và người nhận
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentMessage, setCurrentMessage] = useState<string>("");
  const [receiver, setReceiver] = useState<string>("");
  const [friends, setFriends] = useState<string[]>([]);
  const { notify } = useNotification();
  const socketUrl = `${window.location.protocol}//${window.location.hostname}:8080`;

  const getFriends = async () => {
    try {
      const response = await friendService.getFriends({
        page: 1,
        limit: 10000,
      });

      setFriends(response.data.map((item: { id: string }) => item.id));
    } catch (error) {
      notify("error", { message: "error" });
    }
  };
  useEffect(() => {
    getFriends();

    const newSocket = io(socketUrl, {
      transports: ["websocket"],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    // Lắng nghe các sự kiện kết nối
    newSocket.on("connect", () => {
      console.log("Socket connected successfully");
      // Thông báo user join
      newSocket.emit("join", senderId);
      // Yêu cầu tải tin nhắn cũ
      newSocket.emit("loadMessages");
    });

    // Lắng nghe tin nhắn mới
    newSocket.on("receiveMessage", (message: Message) => {
      // Chỉ hiển thị tin nhắn nếu người dùng hiện tại là người gửi hoặc nhận
      if (message.sender === senderId || message.receiver === senderId) {
        setMessages((prevMessages) => [...prevMessages, message]);
      }
    });

    // Lắng nghe toàn bộ tin nhắn từ server
    newSocket.on("allMessages", (loadedMessages: Message[]) => {
      // Lọc tin nhắn liên quan đến người dùng hiện tại
      const userRelevantMessages = loadedMessages.filter(
        (msg) => msg.sender === senderId || msg.receiver === senderId
      );
      setMessages(userRelevantMessages);
    });

    // Lắng nghe danh sách người dùng trực tuyến (nếu server hỗ trợ)
    newSocket.on("onlineUsers", (users: string[]) => {
      // Loại bỏ người dùng hiện tại khỏi danh sách
      const filteredUsers = users.filter((user) => user !== senderId);
      setFriends(filteredUsers);
    });

    // Xử lý lỗi kết nối
    newSocket.on("connect_error", (error) => {
      console.error("Socket connection error:", error);
    });

    // Lưu socket instance
    setSocket(newSocket);

    // Cleanup khi component unmount
    return () => {
      newSocket.disconnect();
    };
  }, [senderId, socketUrl]);

  // Hàm gửi tin nhắn
  const sendMessage = useCallback(() => {
    if (socket && currentMessage.trim() && receiver) {
      const messagePayload: Message = {
        sender: senderId,
        receiver: receiver,
        message: currentMessage,
        timestamp: Date.now(),
      };

      // Gửi tin nhắn thông qua socket
      socket.emit("sendMessage", messagePayload);

      // Thêm tin nhắn vào state local ngay lập tức
      setMessages((prevMessages) => [...prevMessages, messagePayload]);

      // Làm sạch input sau khi gửi
      setCurrentMessage("");
    }
  }, [socket, currentMessage, senderId, receiver]);

  // Xử lý submit tin nhắn
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage();
  };

  return (
    <div className="chat-container">
      <div className="user-selection">
        <label>Chọn người nhận:</label>
        <select value={receiver} onChange={(e) => setReceiver(e.target.value)}>
          <option value="">Chọn người nhận</option>
          {friends.map((user) => (
            <option key={user} value={user}>
              {user}
            </option>
          ))}
        </select>
      </div>

      <div className="messages-list">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${
              msg.sender === senderId ? "sent" : "received"
            }`}
          >
            <strong>{msg.sender}:</strong> {msg.message}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="message-form">
        <input
          type="text"
          value={currentMessage}
          onChange={(e) => setCurrentMessage(e.target.value)}
          placeholder="Nhập tin nhắn..."
          disabled={!receiver} // Vô hiệu hóa nếu chưa chọn người nhận
        />
        <button type="submit" disabled={!receiver || !currentMessage.trim()}>
          Gửi
        </button>
      </form>
    </div>
  );
};

export default ChatSocket;
