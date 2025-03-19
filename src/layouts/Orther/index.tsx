import { Col, Row } from "antd";
import { ReactNode } from "react";
interface OrtherLayoutProps {
  navigation: ReactNode;
  content: ReactNode;
}

const OrtherLayout: React.FC<OrtherLayoutProps> = ({ navigation, content }) => {
  return (
    <Row className="flex gap-10 bg-[#f2f4f7]">
      <Col
        xs={0}
        sm={5}
        md={7}
        lg={7}
        xl={5}
        className="navigate bg-white min-h-screen shadow-md"
      >
        <div className="fixed w-[21%]">{navigation}</div>
      </Col>

      {/* Nội dung chính */}
      <Col className="content flex-1">{content}</Col>
      <div></div>
    </Row>
  );
};

export default OrtherLayout;
