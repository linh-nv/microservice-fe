import { Avatar, Divider, List, MenuProps, Skeleton } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import { UserOutlined } from "@ant-design/icons";
import { Friends } from "../../shared/interface";
import DropdownAction from "../DropdownAction";
import { useNavigate } from "react-router-dom";
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
  return (
    <div
      id="scrollableDiv"
      style={{
        overflow: "auto",
        paddingLeft: "16px",
      }}
    >
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
          renderItem={(item) => (
            <List.Item key={item.email}>
              <div
                onClick={() => navigate(routes.friend.getDetail(item.id))}
                style={{
                  cursor: "pointer",
                  flex: 1,
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
