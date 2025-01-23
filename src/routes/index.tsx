import { Routes, Route } from "react-router-dom";
import ChatUI from "../pages/Chat";

const App = () => {
  return (
    <Routes>
      <Route path="/chat" element={<ChatUI />} />
    </Routes>
  );
};

export default App;
