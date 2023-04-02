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
    const path = location.pathname;
    if (path === "/dashboard") {
      setPageTitle("Admin Dashboard");
    } else if (path === "/dashboard/tips") {
      setPageTitle("Tips");
    } else if (path === "/dashboard/workout") {
      setPageTitle("Olahraga");
    } else if (path === "/dashboard/program") {
      setPageTitle("Program Olahraga");
    } else if (/^\/dashboard\/tips\/\d+$/.test(path)) {
      setPageTitle("Edit Tips");
    } else if (path === "/dashboard/tips/create") {
      setPageTitle("Create Tips");
    } else {
      setPageTitle("Page Not Found");
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
