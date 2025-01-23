import React, { useState, useEffect } from "react";
import {
  FiUser,
  FiSettings,
  FiPhone,
  FiVideo,
  FiSend,
  FiPaperclip,
  FiSmile,
} from "react-icons/fi";
import { format } from "date-fns";
import ChatCard from "../../components/Card/ChatCard";

const ChatUI = () => {
  const [messages, setMessages] = useState<{ id: number; sender: typeof currentUser; content: string; timestamp: Date }[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const currentUser = {
    id: 1,
    name: "John Doe",
    avatar:
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
    followers: 1200,
    posts: 87,
    bio: "Photography enthusiast | Travel lover",
    location: "New York, USA",
  };

  const otherUser = {
    id: 2,
    name: "Jane Smith",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
    followers: 3500,
    posts: 152,
    bio: "Digital artist | Coffee addict",
    location: "Los Angeles, USA",
  };

  useEffect(() => {
    // Simulating initial messages
    setMessages([
      {
        id: 1,
        sender: otherUser,
        content: "Hey there!",
        timestamp: new Date(Date.now() - 3600000),
      },
      {
        id: 2,
        sender: currentUser,
        content: "Hi! How are you?",
        timestamp: new Date(Date.now() - 3540000),
      },
      {
        id: 3,
        sender: otherUser,
        content: "I'm good, thanks! How about you?",
        timestamp: new Date(Date.now() - 3480000),
      },
    ]);
  }, []);

  const handleSendMessage = () => {
    if (inputMessage.trim() !== "") {
      const newMessage = {
        id: messages.length + 1,
        sender: currentUser,
        content: inputMessage,
        timestamp: new Date(),
      };
      setMessages([...messages, newMessage]);
      setInputMessage("");
      setIsTyping(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputMessage(e.target.value);
    setIsTyping(e.target.value.trim() !== "");
  };

  return (
    <div className="flex w-screen h-screen bg-gray-900 text-white">
      <div className="w-1/4 bg-gray-800 p-4 border-r border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-10 h-10 rounded-full mr-3"
            />
            <span className="font-semibold">{currentUser.name}</span>
          </div>
          <div className="flex space-x-2">
            <button className="p-2 rounded-full hover:bg-gray-700 transition-colors duration-200">
              <FiSettings className="w-5 h-5" />
            </button>
          </div>
        </div>
        <input
          type="text"
          placeholder="Search conversations..."
          className="w-full bg-gray-700 text-white rounded-full py-2 px-4 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="space-y-4">
          {/* Conversations list would go here */}
          <ChatCard user={otherUser} lastMessage="123"/>
        </div>
      </div>
      <div className="flex-1 flex flex-col">
        <div className="bg-gray-800 p-4 flex items-center justify-between">
          <div className="flex items-center">
            <img
              src={otherUser.avatar}
              alt={otherUser.name}
              className="w-10 h-10 rounded-full mr-3"
            />
            <div>
              <h2 className="font-semibold">{otherUser.name}</h2>
              <p className="text-sm text-gray-400">
                {otherUser.followers} followers • {otherUser.posts} posts
              </p>
            </div>
          </div>
          <div className="flex space-x-4">
            <button className="p-2 rounded-full hover:bg-gray-700 transition-colors duration-200">
              <FiPhone className="w-5 h-5" />
            </button>
            <button className="p-2 rounded-full hover:bg-gray-700 transition-colors duration-200">
              <FiVideo className="w-5 h-5" />
            </button>
            <button className="p-2 rounded-full hover:bg-gray-700 transition-colors duration-200">
              <FiUser className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender.id === currentUser.id
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              <div
                className={`max-w-xs lg:max-w-md xl:max-w-lg ${
                  message.sender.id === currentUser.id
                    ? "bg-blue-600"
                    : "bg-gray-700"
                } rounded-lg p-3 shadow-md`}
              >
                <p>{message.content}</p>
                <p className="text-xs text-gray-400 mt-1">
                  {format(message.timestamp, "p")}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-gray-800 p-4">
          <div className="flex items-center bg-gray-700 rounded-full">
            <button className="p-2 rounded-full hover:bg-gray-600 transition-colors duration-200">
              <FiPaperclip className="w-5 h-5" />
            </button>
            <input
              type="text"
              value={inputMessage}
              onChange={handleInputChange}
              placeholder="Type a message..."
              className="flex-1 bg-transparent py-2 px-4 focus:outline-none"
            />
            <button className="p-2 rounded-full hover:bg-gray-600 transition-colors duration-200">
              <FiSmile className="w-5 h-5" />
            </button>
            <button
              onClick={handleSendMessage}
              className="p-2 rounded-full bg-blue-500 hover:bg-blue-600 transition-colors duration-200 ml-2"
            >
              <FiSend className="w-5 h-5" />
            </button>
          </div>
          {isTyping && <p className="text-sm text-gray-400 mt-1">Typing...</p>}
        </div>
      </div>
      <div className="w-1/4 bg-gray-800 p-4 border-l border-gray-700">
        <div className="text-center mb-6">
          <img
            src={otherUser.avatar}
            alt={otherUser.name}
            className="w-24 h-24 rounded-full mx-auto mb-4"
          />
          <h2 className="text-xl font-semibold">{otherUser.name}</h2>
          <p className="text-gray-400">{otherUser.bio}</p>
          <p className="text-sm text-gray-400 mt-2">{otherUser.location}</p>
        </div>
        <div className="flex justify-around mb-6">
          <div className="text-center">
            <p className="font-semibold">{otherUser.posts}</p>
            <p className="text-sm text-gray-400">Posts</p>
          </div>
          <div className="text-center">
            <p className="font-semibold">{otherUser.followers}</p>
            <p className="text-sm text-gray-400">Followers</p>
          </div>
        </div>
        <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full transition-colors duration-200">
          Follow
        </button>
      </div>
    </div>
  );
};

export default ChatUI;
