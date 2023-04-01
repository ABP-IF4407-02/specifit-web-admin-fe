import { useContext } from "react";
import AuthContext from "../store/auth-context";
import LoginPage from "./pages/auth/LoginPage";
import { Navigate } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";
import classes from "./components/Loading.module.css";

function App() {
  const authCtx = useContext(AuthContext);

  if (authCtx.isLoading) {
    return (
      <div className={classes.loadingCircleContainer}>
        <TailSpin
          height="80"
          width="80"
          color="#FF810D"
          ariaLabel="tail-spin-loading"
          radius="1"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
    );
  }

  return authCtx.isLoggedIn ? (
    <Navigate to="/dashboard" replace />
  ) : (
    <LoginPage />
  );
}

export default App;
