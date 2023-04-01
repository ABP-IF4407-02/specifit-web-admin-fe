import { useContext } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../App";
import ProgramPage from "../pages/dashboard/program/ProgramPage";
import TipsPage from "../pages/dashboard/tips/TipsPage";
import WorkoutPage from "../pages/dashboard/workout/WorkoutPage";
import Dashboard from "../pages/dashboard/Dashboard";
import AuthContext from "../../store/auth-context";
import TipsForm from "../components/TipsForm";

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
        path: "tips/:id",
        element: <PrivateRoute element={<TipsForm />} />,
      },
      {
        path: "program",
        element: <PrivateRoute element={<ProgramPage />} />,
      },
      {
        path: "workout",
        element: <PrivateRoute element={<WorkoutPage />} />,
      },
      {
        path: "*",
        element: <Navigate to="/" replace />,
      },
    ],
  },
]);
