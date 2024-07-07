import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Filter from "./filter/Filter";

function AppLayout() {
  return (
    <div className="wrapper">
      <Header />
      <Sidebar />
      <div className="main">
        <div className="container">
          <Outlet />
          <Filter/>
        </div>
      </div>
    </div>
  );
}

export default AppLayout;
