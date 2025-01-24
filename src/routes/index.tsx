import { Routes, Route } from "react-router-dom";
import ChatUI from "../pages/Chat";
import { Login } from "../pages/Login";
import { Register } from "../pages/Register";
import { AuthLayout } from "../layouts/Auth";
import { NotFound } from "../pages/Errors/404";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<h1>Home</h1>} />
      <Route path="" element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
      <Route path="/chat" element={<ChatUI />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
