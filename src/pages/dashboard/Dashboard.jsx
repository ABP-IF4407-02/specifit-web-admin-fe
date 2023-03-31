import Sidebar from "../../components/SideBar";
import TopBar from "../../components/TopBar";
import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";

function Dashboard() {
  const location = useLocation();
  const [pageTitle, setPageTitle] = useState("");

  useEffect(() => {
    switch (location.pathname) {
      case "/dashboard":
        setPageTitle("Dashboard");
        break;
      case "/dashboard/tips":
        setPageTitle("Tips");
        break;
      case "/dashboard/workout":
        setPageTitle("Workout");
        break;
      case "/dashboard/program":
        setPageTitle("Program");
        break;
      default:
        setPageTitle("Page Not Found");
        break;
    }
  }, [location]);

  const showNavCard = location.pathname === "/dashboard";

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="content">
        <TopBar pageTitle={pageTitle} />
        {showNavCard && (
          <div className="nav-card">
            <div className="card-item">
              <h2>Total Programs</h2>
              <p>10</p>
            </div>
          </div>
        )}
        <div className="main-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
