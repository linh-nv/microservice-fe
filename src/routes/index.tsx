import { Routes, Route } from "react-router-dom";
import { AuthLayout } from "../layouts/Auth";
import { lazy } from "react";
import { routes } from "./routes";
import { AppLayout } from "../layouts/App";

const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"));
const Home = lazy(() => import("../pages/Home"));
const Friend = lazy(() => import("../pages/Friend"));
const ChatUI = lazy(() => import("../pages/Chat"));
const Unauthorized = lazy(() => import("../pages/Errors/401"));
const NotFound = lazy(() => import("../pages/Errors/404"));

const App = () => {
  return (
    <Routes>
      <Route path="auth" element={<AuthLayout />}>
        <Route path={routes.auth.login} element={<Login />} />
        <Route path={routes.auth.register} element={<Register />} />
      </Route>
      <Route path="" element={<AppLayout />}>
        <Route path={routes.home} element={<Home />} />
        <Route path={routes.errors[401]} element={<Unauthorized />} />
        <Route path={routes.friend} element={<Friend />} />
        <Route path={routes.chat} element={<ChatUI />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
