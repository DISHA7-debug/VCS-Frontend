import { useEffect, useMemo, useState } from "react";
import Navbar from "../Navbar";
import "./issue.css";

const BASE_URL = "http://localhost:5000"; // ✅ change if needed

const Issue = () => {
  const currentUserId = localStorage.getItem("userId");

  const [activeTab, setActiveTab] = useState("assigned");
  const [query, setQuery] = useState("");
  const [showModal, setShowModal] = useState(false);

  const [repos, setRepos] = useState([]);
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  // form
  const [repoId, setRepoId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // ✅ fetch repos + issues
  useEffect(() => {
    const fetchAll = async () => {
      try {
        setLoading(true);

        const repoRes = await fetch(`${BASE_URL}/repo/all`);
        const repoData = await repoRes.json();
        setRepos(repoData || []);

        const issueRes = await fetch(`${BASE_URL}/issue/all`);
        const issueData = await issueRes.json();
        setIssues(issueData || []);
      } catch (err) {
        console.log("Issues fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  // ✅ helper: normalize (backend field variations handle)
  const isCreatedByMe = (issue) => {
    const created =
      issue?.createdBy ||
      issue?.userID ||
      issue?.userId ||
      issue?.ownerId ||
      issue?.createdById;

    return String(created) === String(currentUserId);
  };

  const isAssignedToMe = (issue) => {
    const assigned =
      issue?.assignee ||
      issue?.assignedTo ||
      issue?.assignedToId ||
      issue?.assigneeId;

    return String(assigned) === String(currentUserId);
  };

  // ✅ filter by tab + search
  const filteredIssues = useMemo(() => {
    let data = [...issues];

    // Tab filter
    if (activeTab === "assigned") {
      data = data.filter(isAssignedToMe);
    } else if (activeTab === "created") {
      data = data.filter(isCreatedByMe);
    } else if (activeTab === "mentioned") {
      // basic: show issues where description contains "@<userId>"
      // (you can change this to username later)
      data = data.filter((i) =>
        (i.description || "").includes(`@${currentUserId}`)
      );
    } else if (activeTab === "activity") {
      // recent activity: just show latest updatedAt/createdAt sorted (if exists)
      data = data.sort((a, b) => {
        const da = new Date(a.updatedAt || a.createdAt || 0).getTime();
        const db = new Date(b.updatedAt || b.createdAt || 0).getTime();
        return db - da;
      });
    }

    // Search filter
    if (query.trim()) {
      data = data.filter((i) =>
        (i.title || "").toLowerCase().includes(query.toLowerCase())
      );
    }

    return data;
  }, [issues, query, activeTab]);

  // ✅ create issue
  const handleCreateIssue = async (e) => {
    e.preventDefault();

    if (!repoId || !title.trim()) {
      alert("Repository and Title are required!");
      return;
    }

    try {
      // ✅ Backend-friendly payload
      const body = {
        repoId,
        title,
        description,
        status: "open",

        // ✅ add creator + default assignee = me (so Assigned to me works)
        createdBy: currentUserId,
        assignee: currentUserId,
      };

      const res = await fetch(`${BASE_URL}/issue/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      // ✅ Add new issue in UI instantly
      setIssues((prev) => [data, ...prev]);

      // reset modal
      setRepoId("");
      setTitle("");
      setDescription("");
      setShowModal(false);
    } catch (err) {
      console.log("Create issue error:", err);
      alert("Issue create failed!");
    }
  };

  // ✅ title based on tab
  const pageTitle =
    activeTab === "assigned"
      ? "Assigned to me"
      : activeTab === "created"
      ? "Created by me"
      : activeTab === "mentioned"
      ? "Mentioned"
      : "Recent activity";

  return (
    <>
      <Navbar />

      <div className="issue-page">
        {/* LEFT SIDEBAR */}
        <aside className="issue-sidebar">
          <h4 className="issue-side-title">Issues</h4>

          <button
            className={`side-item ${activeTab === "assigned" ? "active" : ""}`}
            onClick={() => setActiveTab("assigned")}
          >
            Assigned to me
          </button>

          <button
            className={`side-item ${activeTab === "created" ? "active" : ""}`}
            onClick={() => setActiveTab("created")}
          >
            Created by me
          </button>

          <button
            className={`side-item ${activeTab === "mentioned" ? "active" : ""}`}
            onClick={() => setActiveTab("mentioned")}
          >
            Mentioned
          </button>

          <button
            className={`side-item ${activeTab === "activity" ? "active" : ""}`}
            onClick={() => setActiveTab("activity")}
          >
            Recent activity
          </button>

          <div className="side-divider" />

          <p className="side-muted">Views</p>
          <button className="side-item">+ New view</button>
        </aside>

        {/* MAIN */}
        <main className="issue-main">
          {/* TOP BAR */}
          <div className="issue-topbar">
            <h2 className="issue-heading">{pageTitle}</h2>

            <div className="issue-actions">
              <div className="issue-searchbox">
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Type / to search"
                />
              </div>

              <button
                className="new-issue-btn"
                onClick={() => setShowModal(true)}
              >
                New issue
              </button>
            </div>
          </div>

          {/* FILTER LINE */}
          <div className="issue-filterline">
            <span className="filter-pill">is:issue</span>
            <span className="filter-pill">state:open</span>
            <span className="filter-pill">archived:false</span>
            <span className="filter-pill">assignee:@me</span>
            <span className="filter-pill">sort:updated-desc</span>
          </div>

          {/* LIST */}
          <div className="issue-list">
            <div className="issue-list-header">
              <span>
                {loading ? "Loading..." : `${filteredIssues.length} results`}
              </span>
              <span className="muted-small">Updated</span>
            </div>

            {!loading && filteredIssues.length === 0 && (
              <div className="issue-empty">
                <p>No issues found</p>
              </div>
            )}

            {filteredIssues.map((item) => (
              <div className="issue-row" key={item._id || item.id}>
                <div className="issue-dot" />
                <div className="issue-info">
                  <h4 className="issue-title">{item.title || "Untitled issue"}</h4>
                  <p className="issue-desc">
                    {item.description ? item.description : "No description"}
                  </p>

                  {/* ✅ extra mini-info */}
                  <p className="issue-mini">
                    {isCreatedByMe(item) ? "You created this" : ""}
                    {isAssignedToMe(item) ? " • Assigned to you" : ""}
                  </p>
                </div>

                <span className="issue-status">
                  {(item.status || "open").toUpperCase()}
                </span>
              </div>
            ))}
          </div>
        </main>

        {/* MODAL */}
        {showModal && (
          <div className="modal-overlay" onClick={() => setShowModal(false)}>
            <div className="modal-box" onClick={(e) => e.stopPropagation()}>
              <div className="modal-head">
                <h3>Create new issue</h3>
                <button
                  className="modal-close"
                  onClick={() => setShowModal(false)}
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleCreateIssue} className="modal-form">
                <label>
                  Repository <span className="req">*</span>
                </label>

                <select
                  value={repoId}
                  onChange={(e) => setRepoId(e.target.value)}
                >
                  <option value="">Select repository</option>
                  {repos.map((r) => (
                    <option key={r._id || r.id} value={r._id || r.id}>
                      {r.name}
                    </option>
                  ))}
                </select>

                <label>
                  Title <span className="req">*</span>
                </label>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Issue title..."
                />

                <label>Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Write description..."
                />

                <button type="submit" className="create-issue-btn">
                  Create issue
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Issue;
