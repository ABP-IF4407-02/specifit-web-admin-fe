import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="logo">{/* Add logo image here */}</div>
      <ul className="navigation">
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link to="/dashboard/tips">Tips</Link>
        </li>
        <li>
          <Link to="/dashboard/workout">Workout</Link>
        </li>
        <li>
          <Link to="/dashboard/program">Program</Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
