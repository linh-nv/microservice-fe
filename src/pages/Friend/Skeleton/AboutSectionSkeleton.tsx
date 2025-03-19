import { Card, Skeleton } from "antd";

export const AboutSectionSkeleton: React.FC = () => (
  <Card className="about-section">
    <Skeleton.Input
      active
      size="small"
      style={{ width: 100, marginBottom: 16 }}
    />
    <div className="about-item" style={{ marginBottom: 12 }}>
      <Skeleton.Input active size="small" style={{ width: "100%" }} />
    </div>
    <div className="about-item">
      <Skeleton.Input active size="small" style={{ width: "100%" }} />
    </div>
  </Card>
);
