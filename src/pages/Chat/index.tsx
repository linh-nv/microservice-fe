import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import OrtherLayout from "../../layouts/Orther";

const socketUrl = `${window.location.protocol}//${window.location.hostname}:8080`;
const socket = io(socketUrl);
interface Message {
  sender: string;
  message: string;
}

const Navigation = () => {
  return <></>
}
const Content = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    socket.emit("loadMessages");

    const handleAllMessages = (loadedMessages: Message[]) => {
      setMessages(loadedMessages);
    };

    const handleReceiveMessage = (newMessage: Message) => {
      setMessages((prev) => [...prev, newMessage]);
    };

    socket.on("allMessages", handleAllMessages);
    socket.on("receiveMessage", handleReceiveMessage);

    return () => {
      socket.off("allMessages", handleAllMessages);
      socket.off("receiveMessage", handleReceiveMessage);
    };
  }, []);

  const handleSendMessage = () => {
    if (message.trim() && username.trim()) {
      socket.emit("sendMessage", { sender: username, message });
      setMessage("");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Chat App</h1>
      <div>
        <label>
          Username:{" "}
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
          />
        </label>
      </div>
      <div style={{ margin: "20px 0" }}>
        <div
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            height: "300px",
            overflowY: "scroll",
          }}
        >
          {messages.map((msg, index) => (
            <div key={index} style={{ marginBottom: "10px" }}>
              <strong>{msg.sender}</strong>: {msg.message}
            </div>
          ))}
        </div>
      </div>
      <div>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message"
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

const ChatUI = () => {
  return <OrtherLayout navigation={Navigation()} content={Content()} />;
};

export default ChatUI;
