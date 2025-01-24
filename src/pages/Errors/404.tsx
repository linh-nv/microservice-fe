import { Link } from "react-router-dom";
import NotFoundImage from "../../assets/images/404.svg";
import { Button, Col } from "antd";
export const NotFound = () => {
  return (
    <div className="w-screen flex flex-col items-center justify-center h-screen">
      <img src={NotFoundImage} alt="Not Found" className="w-96" />
      <Col className="flex flex-col items-center justify-center gap-10">
        <h1 className="text-9xl font-bold mb-2 text-violet-400">Oop!!</h1>
        <h2 className="text-3xl font-semibold text-violet-800">Not Found</h2>
        <Button>
          <Link to="/">Go Home</Link>
        </Button>
      </Col>
    </div>
  );
};
