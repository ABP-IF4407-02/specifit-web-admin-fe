import Sidebar from "../../components/SideBar";
import TopBar from "../../components/TopBar";
import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import classes from "./Dashboard.module.css";
import NavCard from "../../components/NavCard";

function Dashboard() {
  const location = useLocation();
  const [pageTitle, setPageTitle] = useState("");

  useEffect(() => {
    switch (location.pathname) {
      case "/dashboard":
        setPageTitle("Admin Dashboard");
        break;
      case "/dashboard/tips":
        setPageTitle("Tips");
        break;
      case "/dashboard/workout":
        setPageTitle("Olahraga");
        break;
      case "/dashboard/program":
        setPageTitle("Program Olahraga");
        break;
      default:
        setPageTitle("Page Not Found");
        break;
    }
  }, [location]);

  const showNavCard = location.pathname === "/dashboard";

  return (
    <div className={classes.dashboardContainer}>
      <Sidebar />
      <div className={classes.pageContent}>
        <TopBar pageTitle={pageTitle} />
        {showNavCard && (
          <div className={classes.dashboardContent}>
            <NavCard
              link="/dashboard/program"
              iconName="barbel"
              name="Program Olahraga"
              count="10"
              desc="Total olahraga"
            />
            <NavCard
              link="/dashboard/workout"
              iconName="barbel"
              name="Olahraga"
              count="10"
              desc="Total program olahraga"
            />
            <NavCard
              link="/dashboard/tips"
              iconName="tips"
              name="Tips"
              count="23"
              desc="Total jumlah tips"
            />
          </div>
        )}
        <div className={classes.mainContent}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
