function TopBar({ pageTitle }) {
    return (
      <div className="top-bar">
        <h1>{pageTitle}</h1>
        <button className="logout-btn">Logout</button>
      </div>
    );
  }
  
  export default TopBar;
  