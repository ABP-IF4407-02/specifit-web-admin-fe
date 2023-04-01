import { useContext } from "react";
import { createBrowserRouter, Route, Navigate } from "react-router-dom";
import App from "../App";
import ProgramPage from "../pages/dashboard/ProgramPage";
import TipsPage from "../pages/dashboard/TipsPage";
import WorkoutPage from "../pages/dashboard/WorkoutPage";
import Dashboard from "../pages/dashboard/Dashboard";
import AuthContext from "../../store/auth-context";

function PrivateRoute({ element }) {
  const { isLoggedIn } = useContext(AuthContext);
  return isLoggedIn ? element : <Navigate to="/" replace />;
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/dashboard",
    element: <PrivateRoute element={<Dashboard />} />,
    children: [
      {
        path: "tips",
        element: <PrivateRoute element={<TipsPage />} />,
      },
      {
        path: "program",
        element: <PrivateRoute element={<ProgramPage />} />,
      },
      {
        path: "workout",
        element: <PrivateRoute element={<WorkoutPage />} />,
      },
    ],
  },
]);
