import { useContext } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../App";
import ProgramPage from "../pages/dashboard/program/ProgramPage";
import TipsPage from "../pages/dashboard/tips/TipsPage";
import WorkoutPage from "../pages/dashboard/workout/WorkoutPage";
import Dashboard from "../pages/dashboard/Dashboard";
import AuthContext from "../../store/auth-context";
import EditTips from "../pages/dashboard/tips/EditTips";
import CreateTips from "../pages/dashboard/tips/CreateTips";
import EditWorkout from "../pages/dashboard/workout/EditWorkout";
import CreateWorkout from "../pages/dashboard/workout/CreateWorkout";
import EditProgram from "../pages/dashboard/program/EditProgram";
import CreateProgram from "../pages/dashboard/program/CreateProgram";

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
        element: <PrivateRoute element={<EditTips />} />,
      },
      {
        path: "tips/create",
        element: <PrivateRoute element={<CreateTips />} />,
      },
      {
        path: "program",
        element: <PrivateRoute element={<ProgramPage />} />,
      },
      {
        path: "program/:id",
        element: <PrivateRoute element={<EditProgram />} />,
      },
      {
        path: "program/create",
        element: <PrivateRoute element={<CreateProgram />} />,
      },
      {
        path: "workout",
        element: <PrivateRoute element={<WorkoutPage />} />,
      },
      {
        path: "workout/:id",
        element: <PrivateRoute element={<EditWorkout />} />,
      },
      {
        path: "workout/create",
        element: <PrivateRoute element={<CreateWorkout />} />,
      },
      {
        path: "*",
        element: <Navigate to="/" replace />,
      },
    ],
  },
]);
