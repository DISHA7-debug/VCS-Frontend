import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import "./dashboard.css";
import { API_URL } from "../../config";




const Dashboard = () => {
  const navigate = useNavigate();

  const [repos, setRepos] = useState([]); // ✅ always array
  const [loading, setLoading] = useState(true);
  const [selectedRepo, setSelectedRepo] = useState(null);

  const fetchRepos = async () => {
  try {
    setLoading(true);

    const userID = localStorage.getItem("userId");
    console.log("✅ USER ID:", userID);

    if (!userID) {
      console.log("❌ No userID in localStorage");
      setRepos([]);
      setSelectedRepo(null);
      setLoading(false);
      return;
    }

    const res = await fetch(`${API_URL}/repo/user/${userID}`);
    const data = await res.json();

    console.log("✅ Repo API Response:", data);

    const repoArray = Array.isArray(data)
      ? data
      : Array.isArray(data?.repos)
      ? data.repos
      : Array.isArray(data?.repositories)
      ? data.repositories
      : Array.isArray(data?.data)
      ? data.data
      : [];

    console.log("✅ Final repoArray:", repoArray);

    setRepos(repoArray);
    setSelectedRepo(repoArray[0] || null);
  } catch (err) {
    console.log("❌ Error fetching repos:", err);
    setRepos([]);
    setSelectedRepo(null);
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
    fetchRepos();
  }, []);

  return (
    <>
      <Navbar />

      <div className="dashboard">
        {/* LEFT */}
        <aside className="left">
          <div className="left-top">
            <h4>Top repositories</h4>

            <button className="new-btn" onClick={() => navigate("/create")}>
              New
            </button>
          </div>

          <input className="input" placeholder="Find a repository..." />

          {loading ? (
            <p style={{ marginTop: "12px", color: "#8b949e" }}>Loading...</p>
          ) : repos.length === 0 ? (
            <p style={{ marginTop: "12px", color: "#8b949e" }}>
              No repositories found
            </p>
          ) : (
            <div className="repo-list">
              {repos.map((repo) => (
                <p
                  key={repo._id}
                  className={`repo ${
                    selectedRepo?._id === repo._id ? "active-repo" : ""
                  }`}
                  onClick={() => setSelectedRepo(repo)}
                >
                  {repo.name}
                </p>
              ))}
            </div>
          )}
        </aside>

        {/* MIDDLE */}
        <main className="middle">
          <h1>Your Workspace</h1>
          <p className="subtitle">
            Manage repositories, track issues, and keep your code history organized ✨
          </p>

          <input className="search" placeholder="Search your repositories..." />

          {selectedRepo ? (
            <div className="repo-card">
              <h3>
                {selectedRepo.name}{" "}
                <span>{selectedRepo.visibility ? "Public" : "Private"}</span>
              </h3>
              <p>{selectedRepo.description || "No description provided"}</p>
            </div>
          ) : (
            <div className="repo-card">
              <h3>
                No Repo Yet <span>Private</span>
              </h3>
              <p>No description provided</p>
            </div>
          )}
        </main>

        {/* RIGHT */}
        <aside className="right">
          <div className="update-card">
            <h4>RepoSphere Updates</h4>

            <p className="blue">Smart Commits</p>
            <p>Commit logs are now more reliable</p>

            <p className="blue">Snapshot Storage</p>
            <p>Fast & safe repo snapshots</p>

            <p className="muted">Next Release</p>
            <p>Branching • Merge support • PRs</p>
          </div>
        </aside>
      </div>
    </>
  );
};

export default Dashboard;
