import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import ProgramPage from "../pages/dashboard/ProgramPage";
import TipsPage from "../pages/dashboard/TipsPage";
import WorkoutPage from "../pages/dashboard/WorkoutPage";
import Dashboard from "../pages/dashboard/Dashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "tips",
        element: <TipsPage />,
      },
      {
        path: "program",
        element: <ProgramPage />,
      },
      {
        path: "workout",
        element: <WorkoutPage />,
      },
    ],
  },
]);