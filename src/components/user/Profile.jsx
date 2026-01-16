import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./profile.css";
import Navbar from "../Navbar";
import HeatMapProfile from "./HeatMap";
import { useAuth } from "../../authContext";

const API_URL = "https://vcs-backend-yvkn.onrender.com";

const Profile = () => {
  const navigate = useNavigate();
  const { setCurrentUser } = useAuth();

  const [userDetails, setUserDetails] = useState({
    username: "",
  });

  useEffect(() => {
    const fetchUserDetails = async () => {
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");

      if (!userId || !token) {
        navigate("/auth");
        return;
      }

      try {
        const response = await axios.get(`${API_URL}/userProfile/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUserDetails(response.data);
      } catch (err) {
        console.error("Cannot fetch user details:", err);
      }
    };

    fetchUserDetails();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setCurrentUser(null);
    navigate("/auth");
  };

  return (
    <>
      <Navbar />

      <button onClick={handleLogout} className="logout-btn">
        Logout
      </button>

      <div className="profile-page-wrapper">
        {/* LEFT */}
        <div className="user-profile-section">
          <div className="profile-image" />

          <h3 className="username">{userDetails.username || "User"}</h3>

          <button className="follow-btn">Follow</button>

          <div className="follower">
            <p>
              <b>10</b> Followers
            </p>
            <p>
              <b>3</b> Following
            </p>
          </div>
        </div>

        {/* RIGHT */}
        <div className="heat-map-section">
          <h3 className="heatmap-title">Recent Contributions</h3>
          <HeatMapProfile />
        </div>
      </div>
    </>
  );
};

export default Profile;
