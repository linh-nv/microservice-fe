import React, { useState, useRef, useEffect } from "react";
import { Input, Avatar, Button, Typography, Badge } from "antd";
import {
  SendOutlined,
  PictureOutlined,
  SmileOutlined,
  AudioOutlined,
  GifOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import classNames from "classnames";

// First, let's define our interfaces for type safety
interface Message {
  id: string;
  content: string;
  timestamp: Date;
  isOwn: boolean;
  reaction?: string;
}

interface ChatProps {
  recipient: {
    id: string;
    name: string;
    avatar?: string;
    isOnline?: boolean;
    lastActive?: string;
  };
  messages: Message[];
  onSendMessage: (content: string) => void;
  onClose: () => void;
}

// Component for individual chat messages
const ChatMessage: React.FC<{ message: Message }> = ({ message }) => {
  return (
    <div
      className={classNames(
        "flex items-end gap-2 mb-2",
        message.isOwn ? "flex-row-reverse" : "flex-row"
      )}
    >
      {!message.isOwn && <Avatar size={28} className="mb-1" />}
      <div
        className={classNames(
          "px-3 py-2 rounded-2xl max-w-[70%]",
          message.isOwn
            ? "bg-[#0084ff] text-white rounded-br-lg"
            : "bg-gray-100 text-gray-800 rounded-bl-lg"
        )}
      >
        <Typography.Text className={message.isOwn ? "text-white" : ""}>
          {message.content}
        </Typography.Text>
      </div>
      {message.reaction && <div className="text-xs">{message.reaction}</div>}
    </div>
  );
};

// Main chat component
const ChatWindow: React.FC<ChatProps> = ({
  recipient,
  messages,
  onSendMessage,
  onClose,
}) => {
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (inputValue.trim()) {
      onSendMessage(inputValue.trim());
      setInputValue("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-0 right-4 w-[328px] bg-white rounded-t-lg shadow-lg">
      {/* Chat Header */}
      <div className="px-4 py-2 border-b flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Badge dot={recipient.isOnline} color="green" offset={[-6, 32]}>
            <Avatar src={recipient.avatar} size={32}>
              {!recipient.avatar && recipient.name[0]}
            </Avatar>
          </Badge>
          <div>
            <Typography.Text strong>{recipient.name}</Typography.Text>
            <div className="text-xs text-gray-500">
              {recipient.isOnline ? "Đang hoạt động" : recipient.lastActive}
            </div>
          </div>
        </div>
        <Button type="text" icon={<CloseOutlined />} onClick={onClose} />
      </div>

      {/* Messages Area */}
      <div className="h-[400px] overflow-y-auto px-4 py-2">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t p-2">
        <div className="flex items-center gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Aa"
            bordered={false}
            suffix={<SmileOutlined className="text-gray-400" />}
          />
          <div className="flex items-center gap-2 px-2">
            <Button type="text" icon={<PictureOutlined />} size="small" />
            <Button type="text" icon={<GifOutlined />} size="small" />
            <Button type="text" icon={<AudioOutlined />} size="small" />
            <Button
              type="text"
              icon={<SendOutlined />}
              size="small"
              onClick={handleSend}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// Example usage
const ChatTest = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "1",
      timestamp: new Date(),
      isOwn: true,
    },
    {
      id: "2",
      content: "2",
      timestamp: new Date(),
      isOwn: true,
    },
    {
      id: "3",
      content: "3",
      timestamp: new Date(),
      isOwn: false,
    },
    {
      id: "4",
      content: "4",
      timestamp: new Date(),
      isOwn: false,
    },
  ]);

  const handleSendMessage = (content: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      timestamp: new Date(),
      isOwn: true,
    };
    setMessages([...messages, newMessage]);
  };

  return (
    <ChatWindow
      recipient={{
        id: "1",
        name: "A",
        isOnline: true,
        lastActive: "Hoạt động 26 phút trước",
      }}
      messages={messages}
      onSendMessage={handleSendMessage}
      onClose={() => console.log("Chat closed")}
    />
  );
};

export default ChatTest;
