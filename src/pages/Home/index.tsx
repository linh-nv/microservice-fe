import { Col, Row } from "antd";

const Home: React.FC = () => {
  return (
    <Row className="app-body container mx-auto flex justify-between">
      <Col xs={0} sm={4} md={6} lg={6} xl={5} className="sidebar left-sidebar">
        {/* Nội dung Sidebar trái */}
      </Col>

      {/* Nội dung chính */}
      <Col xs={24} sm={16} md={12} lg={12} xl={10} className="content">
        {/* <PostCard post={{ title: "Title", content: "Hello World" }} />
        <PostCard post={{ title: "Title", content: "Hello World" }} />
        <PostCard post={{ title: "Title", content: "Hello World" }} /> */}
      </Col>

      <Col xs={0} sm={4} md={6} lg={6} xl={5} className="sidebar right-sidebar">
        {/* Nội dung Sidebar phải */}
      </Col>
    </Row>
  );
};

export default Home;
