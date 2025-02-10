import { Avatar, Divider, List, MenuProps, Skeleton } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import { UserOutlined } from "@ant-design/icons";
import { Friends } from "../../shared/interface";
import { ReactNode } from "react";
import DropdownAction from "../DropdownAction";

interface InfiniteListProps {
  data: Friends[];
  loadMore: () => void;
  hasMore: boolean;
  dropdown: ReactNode;
  menuItems: (props: { id: string; lastName: string }) => MenuProps["items"];
}

export const InfiniteList: React.FC<InfiniteListProps> = ({
  data,
  loadMore,
  hasMore,
  dropdown,
  menuItems
}) => {
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
                title={<a href="#">{item.fullName}</a>}
                description={item.email}
              />
              {/* Dropdown */}
              <DropdownAction
                items={menuItems({
                  id: item?.id,
                  lastName: item?.lastName,
                })}
              />
              {dropdown}
            </List.Item>
          )}
        />
      </InfiniteScroll>
    </div>
  );
};
