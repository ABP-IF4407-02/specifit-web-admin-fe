import { useContext } from "react";
import AuthContext from "../store/auth-context";
import LoginPage from "./pages/auth/LoginPage";
import { Navigate } from "react-router-dom";
import LoadingSpinner from "./components/ui/LoadingSpinner";

function App() {
  const authCtx = useContext(AuthContext);

  if (authCtx.isLoading) {
    return <LoadingSpinner />;
  }

  return authCtx.isLoggedIn ? (
    <Navigate to="/dashboard" replace />
  ) : (
    <LoginPage />
  );
}

export default App;
