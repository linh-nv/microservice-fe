import { Card } from "antd";

interface PostCardProps {
  post: {
    title: string;
    content: string;
  };
}
export const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <Card
      title={post.title}
      bordered={false}
      style={{ boxShadow: "0 2px 3px rgba(0,0,0,0.1)" }}
      loading={true}
    >
      {post.content}
    </Card>
  );
};
