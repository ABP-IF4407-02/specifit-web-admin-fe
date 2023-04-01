import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../store/auth-context";

function TopBar({ pageTitle }) {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  function onLogoutHandler() {
    authCtx.logout();
    navigate("/");
  }

  return (
    <div className="top-bar">
      <h1>{pageTitle}</h1>
      <button className="logout-btn" onClick={onLogoutHandler}>
        Logout
      </button>
    </div>
  );
}

export default TopBar;
