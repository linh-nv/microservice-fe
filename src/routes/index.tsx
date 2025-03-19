import { Routes, Route } from "react-router-dom";
import { AuthLayout } from "../layouts/Auth";
import { lazy } from "react";
import { routes } from "./routes";
import { AppLayout } from "../layouts/App";
import AuthCallback from "../pages/Login/redirect";

const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"));
const Home = lazy(() => import("../pages/Home"));
const Friend = lazy(() => import("../pages/Friend"));
const AllFriend = lazy(() => import("../pages/Friend/allFriend"));
const FriendDetail = lazy(() => import("../pages/Friend/friendDetail"));

const ChatUI = lazy(() => import("../pages/Chat"));
const Unauthorized = lazy(() => import("../pages/Errors/401"));
const NotFound = lazy(() => import("../pages/Errors/404"));

const App = () => {
  return (
    <Routes>
      <Route path="" element={<AuthLayout />}>
        <Route path={routes.auth.login} element={<Login />} />
        <Route path={routes.auth.register} element={<Register />} />
      </Route>
      <Route path="" element={<AppLayout />}>
        <Route path={routes.home} element={<Home />} />
        <Route path={routes.errors[401]} element={<Unauthorized />} />
        {/* <Route element={<OrtherLayout/>}></Route> */}
        <Route path={routes.friend.home}>
          <Route path="" element={<Friend />} />
          <Route path={routes.friend.all} element={<AllFriend />}>
            <Route path={routes.friend.detail} element={<FriendDetail />} />
          </Route>
        </Route>
        <Route path={routes.chat} element={<ChatUI />} />
      </Route>
      <Route path="/auth/callback" element={<AuthCallback />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
