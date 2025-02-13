import { Skeleton } from "antd";

export const ProfileHeaderSkeleton: React.FC = () => (
  <div className="profile-header">
    <div className="profile-avatar-container">
      <Skeleton.Avatar active size={168} className="profile-avatar" />
    </div>
    <div className="profile-info">
      <Skeleton.Input
        active
        size="large"
        style={{ width: 200, marginBottom: 16 }}
      />
      <Skeleton.Input
        active
        size="small"
        style={{ width: 150, marginBottom: 16 }}
      />
      <div className="friend-avatars">
        <Skeleton.Avatar active size="default" />
        <Skeleton.Avatar active size="default" />
      </div>
    </div>
    <div className="profile-actions">
      <Skeleton.Button active size="default" style={{ width: 100 }} />
      <Skeleton.Button active size="default" style={{ width: 80 }} />
      <Skeleton.Button active size="default" style={{ width: 40 }} />
    </div>
  </div>
);
