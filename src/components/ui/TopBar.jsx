import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../../store/auth-context";
import classes from "./TopBar.module.css";

function TopBar({ pageTitle }) {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  function onLogoutHandler() {
    authCtx.logout();
    navigate("/");
  }

  return (
    <div className={classes.topBar}>
      <h1 className={classes.pageTitle}>{pageTitle}</h1>
      <button className={classes.logoutBtn} onClick={onLogoutHandler}>
        Logout
      </button>
    </div>
  );
}

export default TopBar;
