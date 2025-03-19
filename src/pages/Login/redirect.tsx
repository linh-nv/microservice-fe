import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("temp_auth_token");

    if (token) {
      Cookies.set("access_token", token);

      sessionStorage.removeItem("temp_auth_token");

      navigate("/home");
    } else {
      console.error("Token không tìm thấy");
      navigate("/login");
    }
  }, [navigate]);

  return <div>Đang xử lý đăng nhập...</div>;
};

export default AuthCallback;
