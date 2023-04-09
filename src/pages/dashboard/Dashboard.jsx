import Sidebar from "../../components/ui/Sidebar";
import TopBar from "../../components/ui/TopBar";
import { useState, useEffect, useContext } from "react";
import { Outlet, useLocation } from "react-router-dom";
import classes from "./Dashboard.module.css";
import NavCard from "../../components/ui/NavCard";
import AuthContext from "../../../store/auth-context";
import axios from "axios";

function Dashboard() {
  const location = useLocation();
  const [pageTitle, setPageTitle] = useState("");
  const authCtx = useContext(AuthContext);
  const [count, setCount] = useState({
    tips: 0,
    workout: 0,
    program: 0,
  });

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
    } else if (/^\/dashboard\/tips\/[0-9a-f]{24}$/.test(path)) {
      setPageTitle("Edit Tips");
    } else if (path === "/dashboard/tips/create") {
      setPageTitle("Create Tips");
    } else if (/^\/dashboard\/workout\/[0-9a-f]{24}$/.test(path)) {
      setPageTitle("Edit Olahraga");
    } else if (path === "/dashboard/workout/create") {
      setPageTitle("Create Workout");
    } else if (/^\/dashboard\/program\/[0-9a-f]{24}$/.test(path)) {
      setPageTitle("Edit Program");
    } else if (path === "/dashboard/program/create") {
      setPageTitle("Create Program");
    } else {
      setPageTitle("Page Not Found");
    }
  }, [location]);

  useEffect(() => {
    async function getCount() {
      const token = authCtx.token;
      try {
        const response = await axios.get("http://178.128.103.166/api/tips", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const response_2 = await axios.get(
          "http://178.128.103.166/api/workout",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const response_3 = await axios.get(
          "http://178.128.103.166/api/workoutprogram",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setCount({
          ...count,
          ["tips"]: response.data.data.total,
          ["workout"]: response_2.data.data.total,
          ["program"]: response_3.data.data.total,
        });
      } catch (error) {
        alert(error.response.data.data.error);
      }
    }
    getCount();
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
              count={count.program}
              desc="Total program olahraga"
            />
            <NavCard
              link="/dashboard/workout"
              iconName="barbel"
              name="Olahraga"
              count={count.workout}
              desc="Total olahraga"
            />
            <NavCard
              link="/dashboard/tips"
              iconName="tips"
              name="Tips"
              count={count.tips}
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
