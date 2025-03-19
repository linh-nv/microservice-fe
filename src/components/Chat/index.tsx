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
      notify("error", { message: "Không thể tải danh sách bạn bè" });
    }
  };

  // Khởi tạo socket và thiết lập các listeners
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
      newSocket.emit("join", senderId);
    });

    // Lắng nghe tin nhắn mới
    newSocket.on("receiveMessage", (message: Message) => {
      console.log("Tin nhắn mới:", message);
      if (message.sender === senderId || message.receiver === senderId) {
        setMessages((prevMessages) => [...prevMessages, message]);
      }
    });

    // Lắng nghe tin nhắn đã tải
    newSocket.on('allMessages', (receivedMessages) => {
      console.log('Nhận tin nhắn từ server:', receivedMessages);
      if (Array.isArray(receivedMessages)) {
        setMessages(receivedMessages);
      } else {
        console.error('Dữ liệu tin nhắn không hợp lệ:', receivedMessages);
        setMessages([]);
      }
    });

    // // Lắng nghe danh sách người dùng trực tuyến
    // newSocket.on("onlineUsers", (users: string[]) => {
    //   const filteredUsers = users.filter((user) => user !== senderId);
    //   setFriends(filteredUsers);
    // });

    // Xử lý lỗi kết nối
    newSocket.on("connect_error", (error) => {
      console.error("Socket connection error:", error);
      notify("error", { message: "Lỗi kết nối socket" });
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [senderId, socketUrl]);

  // Load tin nhắn khi người dùng chọn receiver
  useEffect(() => {
    if (socket && receiver) {
      console.log("Đang tải tin nhắn giữa:", senderId, "và", receiver);
      socket.emit("loadMessages", [senderId, receiver]);
    }
  }, [socket, receiver, senderId]);

  // Hàm gửi tin nhắn
  const sendMessage = useCallback(() => {
    if (socket && currentMessage.trim() && receiver) {
      const messagePayload: Message = {
        sender: senderId,
        receiver: receiver,
        message: currentMessage,
        timestamp: Date.now(),
      };

      console.log("Gửi tin nhắn:", messagePayload);
      socket.emit("sendMessage", messagePayload);

      setMessages((prevMessages) => [...prevMessages, messagePayload]);
      setCurrentMessage("");
    }
  }, [socket, currentMessage, senderId, receiver]);

  // Xử lý submit tin nhắn
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage();
  };

  // Hàm tải tin nhắn thủ công
  const loadMessages = () => {
    if (socket && receiver) {
      console.log("Tải lại tin nhắn giữa:", senderId, "và", receiver);
      
    } else {
      notify("warning", { message: "Vui lòng chọn người nhận trước" });
    }
  };

  // Xử lý khi thay đổi người nhận
  const handleReceiverChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newReceiver = e.target.value;
    setReceiver(newReceiver);
    setMessages([]); // Xóa tin nhắn cũ khi chuyển người nhận
  };

  return (
    <div className="chat-container">
      <div className="user-selection">
        <label>Chọn người nhận:</label>
        <select 
          value={receiver} 
          onChange={handleReceiverChange}
        >
          <option value="">Chọn người nhận</option>
          {friends.map((user) => (
            <option key={user} value={user}>
              {user}
            </option>
          ))}
        </select>
      </div>

      <div className="messages-list">
        {messages.length > 0 ? (
          messages.map((msg, index) => (
            <div
              key={index}
              className={`message ${
                msg.sender === senderId ? "sent" : "received"
              }`}
            >
              <strong>{msg.sender}:</strong> {msg.message}
              {msg.timestamp && (
                <span className="timestamp">
                  {new Date(msg.timestamp).toLocaleTimeString()}
                </span>
              )}
            </div>
          ))
        ) : (
          <p className="no-messages">Chưa có tin nhắn nào</p>
        )}
      </div>

      <form onSubmit={handleSubmit} className="message-form">
        <input
          type="text"
          value={currentMessage}
          onChange={(e) => setCurrentMessage(e.target.value)}
          placeholder="Nhập tin nhắn..."
          disabled={!receiver}
        />
        <button type="submit" disabled={!receiver || !currentMessage.trim()}>
          Gửi
        </button>
      </form>
      <button 
        onClick={loadMessages} 
        disabled={!receiver}
        className="load-button"
      >
        Tải tin nhắn
      </button>
    </div>
  );
};

export default ChatSocket;