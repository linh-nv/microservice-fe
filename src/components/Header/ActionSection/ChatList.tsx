import React from "react";
import { Input, List, Avatar, Badge, Typography, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";

// Define our interfaces for type safety
interface Message {
  id: string;
  content: string;
  timestamp: Date;
}

interface ChatUser {
  id: string;
  name: string;
  avatar?: string;
  lastMessage: Message;
  isOnline?: boolean;
  unreadCount?: number;
}

interface ChatListProps {
  users: ChatUser[];
  onUserSelect?: (userId: string) => void;
  selectedUserId?: string;
}

// Component for the search input
const SearchBar: React.FC = () => (
    <Input
    prefix={<SearchOutlined className="text-gray-400" />}
    placeholder="Tìm kiếm đoạn chat"
    className="rounded-full bg-gray-100 mb-2"
    bordered={false}
    // value={searchText}
    // onChange={handleSearch}
  />
);

// Component for rendering the last message preview
const MessagePreview: React.FC<{ message: Message }> = ({ message }) => {
  const formattedTime = formatDistanceToNow(message.timestamp, {
    addSuffix: true,
    locale: vi,
  });

  return (
    <Space className="w-full justify-between">
      <Typography.Text ellipsis className="text-gray-500 max-w-[180px]">
        {message.content}
      </Typography.Text>
      <Typography.Text className="text-gray-400 text-xs">
        {formattedTime}
      </Typography.Text>
    </Space>
  );
};

// Main ChatList component
const ChatList: React.FC<ChatListProps> = ({
  users,
  onUserSelect,
  selectedUserId,
}) => {
  return (
    <div className="w-[400px] bg-white rounded-lg">
      {/* Header */}
      <div className="border-b mb-2">
        <Typography.Title level={4} className="mb-4">
          Đoạn chat
        </Typography.Title>
        <SearchBar />
      </div>

      {/* Chat List */}
      <List
        dataSource={users}
        className="overflow-y-auto max-h-[calc(100vh-200px)]"
        renderItem={(user) => (
          <List.Item
            key={user.id}
            className={`cursor-pointer hover:bg-gray-50 transition-colors rounded-lg ${
              selectedUserId === user.id ? "bg-blue-50" : ""
            }`}
            onClick={() => onUserSelect?.(user.id)}
          >
            <List.Item.Meta
            className="px-2"
              avatar={
                <Badge dot={user.isOnline} offset={[-6, 32]} color="green">
                  <Avatar src={user.avatar} size={40} className="flex-shrink-0">
                    {!user.avatar && user.name[0]}
                  </Avatar>
                </Badge>
              }
              title={
                <Space className="w-full justify-between">
                  <Typography.Text strong>{user.name}</Typography.Text>
                  {user.unreadCount ? (
                    <Badge
                      count={user.unreadCount}
                      size="small"
                      className="ml-2"
                    />
                  ) : null}
                </Space>
              }
              description={<MessagePreview message={user.lastMessage} />}
            />
          </List.Item>
        )}
      />
    </div>
  );
};

export default ChatList;
