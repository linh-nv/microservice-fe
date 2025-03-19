import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import { routes } from "../../routes/routes";
import { Spin, message } from "antd";

const AuthCallback = () => {
  const navigate = useNavigate();
  const { token } = useParams();

  useEffect(() => {
    if (token) {
      Cookies.set("refresh_token", token);

      navigate(routes.home);
    } else {
      message.error("Token không tìm thấy");
      navigate(routes.auth.login);
    }
  }, [navigate]);

  return <Spin />;
};

export default AuthCallback;
