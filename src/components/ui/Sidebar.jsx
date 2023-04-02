import { Link, useLocation } from "react-router-dom";
import { IoHome, IoBulb, IoBarbell } from "react-icons/io5";
import classes from "./Sidebar.module.css";
import specifitLogo from "../../assets/specifit-logo-login.png";

function Sidebar() {
  const location = useLocation();

  const isActive = (route) => {
    return route === location.pathname;
  };

  return (
    <div className={classes.sidebar}>
      <img
        className={classes.logoImage}
        src={specifitLogo}
        alt="Specifit Logo"
      ></img>
      <ul className={classes.navigation}>
        <li>
          <Link to="/dashboard" className={isActive("/dashboard") ? classes.active : ""}>
            <IoHome />
            <span>Dashboard</span>
          </Link>
        </li>
        <li>
          <Link to="/dashboard/tips" className={isActive("/dashboard/tips") ? classes.active : ""}>
            <IoBulb />
            <span>Tips</span>
          </Link>
        </li>
        <li>
          <Link to="/dashboard/workout" className={isActive("/dashboard/workout") ? classes.active : ""}>
            <IoBarbell />
            <span>Olahraga</span>
          </Link>
        </li>
        <li>
          <Link to="/dashboard/program" className={isActive("/dashboard/program") ? classes.active : ""}>
            <IoBarbell />
            <span>Program Olahraga</span>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
