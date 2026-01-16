import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../Navbar";
import "./createRepo.css";

const RepoDetails = () => {
  const { id } = useParams();
  const [repo, setRepo] = useState(null);

  useEffect(() => {
    const fetchRepo = async () => {
      try {
        const res = await fetch(`https://vcs-backend-yvkn.onrender.com/repo/${id}`);
        const data = await res.json();
        setRepo(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchRepo();
  }, [id]);

  return (
    <>
      <Navbar />

      <div className="repo-page">
        <div className="repo-container">
          <h1 className="repo-title">{repo?.repoName || "Repository"}</h1>
          <p className="repo-subtitle">
            {repo?.description || "No description available"}
          </p>

          <div className="repo-form">
            <p style={{ color: "#8b949e" }}>
              Repo visibility:{" "}
              <span style={{ color: "#e6edf3", fontWeight: "600" }}>
                {repo?.visibility || "public"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default RepoDetails;
