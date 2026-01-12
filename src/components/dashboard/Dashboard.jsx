import Navbar from "../Navbar";// adjust path if needed
import "./dashboard.css";

const Dashboard = () => {
  return (
    <>
      <Navbar />

      <div className="dashboard">
        {/* LEFT */}
        <aside className="left">
          <h4>Top repositories</h4>
          <button className="new-btn">New</button>

          <input className="input" placeholder="Find a repository..." />

          <p className="repo">Test Repo New</p>
        </aside>

        {/* MIDDLE */}
        <main className="middle">
          <h1>Home</h1>

          <input
            className="search"
            placeholder="Search your repositories..."
          />

          <div className="repo-card">
            <h3>
              Test Repo New <span>Private</span>
            </h3>
            <p>No description provided</p>
          </div>
        </main>

        {/* RIGHT */}
        <aside className="right">
          <div className="update-card">
            <h4>Latest updates</h4>
            <p className="blue">Repository snapshots</p>
            <p>Improved commit reliability</p>

            <p className="blue">VCS Engine</p>
            <p>Faster diff calculations</p>

            <p className="muted">Coming soon</p>
            <p>Branching & merge support</p>
          </div>
        </aside>
      </div>
    </>
  );
};

export default Dashboard;
