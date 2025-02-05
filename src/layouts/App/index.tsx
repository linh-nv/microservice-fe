import { Outlet } from "react-router-dom";
import Header from "../../components/Header";

export const AppLayout: React.FC = () => {
  return (
    <div className="app-layout w-screen h-screen mt-14">
      <Header />

      {/* Body content */}
      <Outlet />
    </div>
  );
};
