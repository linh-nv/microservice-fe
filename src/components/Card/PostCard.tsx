import React from "react";
import { Card, Avatar, Button, Space, Tooltip } from "antd";
import {
  LikeOutlined,
  CommentOutlined,
  ShareAltOutlined,
} from "@ant-design/icons";
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale"; // For Vietnamese localization

// Define interface for social reactions
interface Reaction {
  type: "LIKE" | "LOVE" | "HAHA" | "WOW" | "SAD" | "ANGRY";
  count: number;
}

// Define our main component props
interface SocialCardProps {
  author: {
    name: string;
    avatar: string;
    timestamp: Date;
  };
  content: string;
  images?: string[];
  reactions?: Reaction[];
  commentCount?: number;
  shareCount?: number;
  onLike?: () => void;
  onComment?: () => void;
  onShare?: () => void;
}

const SocialCard: React.FC<SocialCardProps> = ({
  author,
  content,
  images,
  reactions,
  commentCount = 0,
  shareCount = 0,
  onLike,
  onComment,
  onShare,
}) => {
  // Calculate total reactions
  const totalReactions =
    reactions?.reduce((sum, reaction) => sum + reaction.count, 0) || 0;

  // Format the timestamp in Vietnamese
  const formattedTime = formatDistanceToNow(author.timestamp, {
    addSuffix: true,
    locale: vi,
  });

  return (
    <Card className="mb-4 shadow-sm w-full">
      {/* Author Section */}
      <div className="flex items-start mb-3">
        <Avatar size={40} src={author.avatar} />
        <div className="ml-3">
          <h4 className="font-semibold text-[15px] mb-0">{author.name}</h4>
          <Tooltip title={author.timestamp.toLocaleString()}>
            <span className="text-gray-500 text-sm">{formattedTime}</span>
          </Tooltip>
        </div>
      </div>

      {/* Content Section */}
      <div className="mb-3">
        <p className="text-[15px] mb-3">{content}</p>

        {/* Image Grid */}
        {images && images.length > 0 && (
          <div className="grid gap-1">
            {images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Post image ${index + 1}`}
                className="w-full rounded-md object-cover"
              />
            ))}
          </div>
        )}
      </div>

      {/* Reactions Count Section */}
      {totalReactions > 0 && (
        <div className="flex justify-between items-center py-2 border-b border-gray-200">
          <div className="flex items-center gap-1">
            <span className="text-sm text-gray-500">
              {totalReactions} lượt thích
            </span>
          </div>
          <div className="text-sm text-gray-500">
            {commentCount > 0 && `${commentCount} bình luận • `}
            {shareCount > 0 && `${shareCount} chia sẻ`}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <Space className="w-full grid grid-cols-3 gap-4 pt-2">
        <Button
          type="text"
          icon={<LikeOutlined />}
          onClick={onLike}
          className="w-full border-none opacity-70 font-semibold"
        >
          Thích
        </Button>
        <Button
          type="text"
          icon={<CommentOutlined />}
          onClick={onComment}
          className="w-full border-none opacity-70 font-semibold"
        >
          Bình luận
        </Button>
        <Button
          type="text"
          icon={<ShareAltOutlined />}
          onClick={onShare}
          className="w-full border-none opacity-70 font-semibold"
        >
          Chia sẻ
        </Button>
      </Space>
    </Card>
  );
};

export default SocialCard;
