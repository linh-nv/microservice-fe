import { UserChat } from "../../shared/interface";

interface ChatCardProps {
  user: UserChat;
  lastMessage: string;
}

const ChatCard: React.FC<ChatCardProps> = ({ user, lastMessage }) => {
  return (
    <div className="flex items-center p-2 rounded-lg hover:bg-gray-700 transition-colors duration-200 cursor-pointer">
      <img
        src={user.avatar}
        alt={user.name}
        className="w-12 h-12 rounded-full mr-3"
      />
      <div>
        <h3 className="font-semibold">{user.name}</h3>
        <p className="text-sm text-gray-400">{lastMessage}</p>
      </div>
    </div>
  );
};

export default ChatCard;
