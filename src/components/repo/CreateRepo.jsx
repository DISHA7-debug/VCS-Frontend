import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import "./createRepo.css";

const CreateRepo = () => {
    const navigate = useNavigate();

    const [repoName, setRepoName] = useState("");
    const [description, setDescription] = useState("");
    const [visibility, setVisibility] = useState(true);
    const [loading, setLoading] = useState(false);

    const handleCreateRepo = async (e) => {
        e.preventDefault();

        if (!repoName.trim()) {
            alert("Repository name is required!");
            return;
        }

        const userID = localStorage.getItem("userId");
        if (!userID) {
            alert("User not logged in!");
            navigate("/auth");
            return;
        }

        try {
            setLoading(true);

            const payload = {
                name: repoName,
                description,
                visibility: visibility === "true", // ✅ boolean
                owner: userID,
            };

            const res = await fetch("http://localhost:3002/repo/create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            // ✅ SAFE RESPONSE PARSING
            const text = await res.text();
            let data;
            try {
                data = JSON.parse(text);
            } catch {
                data = { message: text };
            }

            if (!res.ok) {
                alert(data?.message || "Repo creation failed!");
                return;
            }

            alert("Repository created successfully ✅");
            navigate("/");
        } catch (err) {
            console.log(err);
            alert("Something went wrong!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Navbar />

            <div className="repo-page">
                <div className="repo-container">
                    <h1 className="repo-title">Create a new repository</h1>
                    <p className="repo-subtitle">
                        Repositories contain a project's files and version history.
                    </p>

                    <form className="repo-form" onSubmit={handleCreateRepo}>
                        {/* General */}
                        <div className="repo-section">
                            <h3 className="repo-section-title">General</h3>

                            <div className="repo-row">
                                <div className="repo-field">
                                    <label>Owner *</label>
                                    <div className="repo-owner-box">
                                        {localStorage.getItem("userId")}
                                    </div>
                                </div>

                                <div className="repo-field repo-grow">
                                    <label>Repository name *</label>
                                    <input
                                        type="text"
                                        value={repoName}
                                        onChange={(e) => setRepoName(e.target.value)}
                                        placeholder="Enter repository name"
                                    />
                                </div>
                            </div>

                            <div className="repo-field">
                                <label>Description</label>
                                <input
                                    type="text"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="Optional"
                                />
                            </div>
                        </div>

                        {/* Configuration */}
                        <div className="repo-section">
                            <h3 className="repo-section-title">Configuration</h3>

                            <div className="repo-visibility">
                                <label>Choose visibility *</label>

                                <div className="visibility-options">
                                    <label className="vis-option">
                                        <input
                                            type="radio"
                                            name="visibility"
                                            value="public"
                                            checked={visibility === true}
                                            onChange={() => setVisibility(true)}
                                        />
                                        <div>
                                            <p className="vis-title">Public</p>
                                            <p className="vis-desc">Anyone can see this repository.</p>
                                        </div>
                                    </label>

                                    <label className="vis-option">
                                        <input
                                            type="radio"
                                            name="visibility"
                                            value="private"
                                            checked={visibility === false}
                                            onChange={() => setVisibility(false)}
                                        />
                                        <div>
                                            <p className="vis-title">Private</p>
                                            <p className="vis-desc">
                                                Only you can see this repository.
                                            </p>
                                        </div>
                                    </label>
                                </div>
                            </div>
                        </div>

                        <button className="create-btn" disabled={loading}>
                            {loading ? "Creating..." : "Create repository"}
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default CreateRepo;
