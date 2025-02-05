import NotFoundImage from "../../assets/images/404.svg";
import { Button, Col } from "antd";
import { useNavigate } from "react-router-dom";

export default function Unauthorized() {
  const navigate = useNavigate();

  return (
    <div className="w-screen flex flex-col items-center justify-center h-screen">
      <img src={NotFoundImage} alt="Not Found" className="w-96" />
      <Col className="flex flex-col items-center justify-center gap-10">
        <h1 className="text-9xl font-bold mb-2 text-violet-400">Oop!!</h1>
        <h2 className="text-3xl font-semibold text-violet-800">Unauthorized</h2>
        <Button onClick={() => navigate(-1)} type="primary">
          Back
        </Button>
      </Col>
    </div>
  );
}
