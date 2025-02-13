import { Avatar, Divider, List, MenuProps, Skeleton } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import { UserOutlined } from "@ant-design/icons";
import { Friends } from "../../shared/interface";
import DropdownAction from "../DropdownAction";
import { useNavigate, useParams } from "react-router-dom";
import { routes } from "../../routes/routes";
interface InfiniteListProps {
  data: Friends[];
  loadMore: () => void;
  hasMore: boolean;
  menuItems: (props: { id: string; lastName: string }) => MenuProps["items"];
}

export const InfiniteList: React.FC<InfiniteListProps> = ({
  data,
  loadMore,
  hasMore,
  menuItems,
}) => {
  const navigate = useNavigate();
  const { id: activeId } = useParams();

  return (
    <div id="scrollableDiv">
      <InfiniteScroll
        dataLength={data.length}
        next={loadMore}
        hasMore={hasMore}
        loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
        endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
        scrollableTarget="scrollableDiv"
      >
        <List
          dataSource={data}
          style={{
            transition: "background-color 0.3s",
          }}
          renderItem={(item) => (
            <List.Item
              key={item.email}
              className={`
                cursor-pointer mx-2 rounded-md transition-colors
                ${
                  activeId === item.id
                    ? "bg-gray-100 hover:bg-gray-100"
                    : "hover:bg-gray-50"
                }
              `}
            >
              <div
                onClick={() => navigate(routes.friend.navigateDetail(item.id))}
                style={{
                  cursor: "pointer",
                  flex: 1,
                  marginLeft: "10px",
                }}
              >
                <List.Item.Meta
                  avatar={
                    <Avatar
                      size={50}
                      src={item.profile.avatarUrl || undefined}
                      icon={
                        !item.profile?.avatarUrl ? <UserOutlined /> : undefined
                      }
                    />
                  }
                  title={item.fullName}
                  description={item.email}
                />
              </div>
              {/* Dropdown */}
              <DropdownAction
                style={{ marginRight: "10px" }}
                items={menuItems({
                  id: item?.id,
                  lastName: item?.lastName,
                })}
              />
            </List.Item>
          )}
        />
      </InfiniteScroll>
    </div>
  );
};
