# 🌐 RepoSphere (VCS Frontend) 🚀

RepoSphere is a GitHub-inspired **frontend web application** that simulates a modern version-control platform UI.  
It allows users to **sign up / login**, manage repositories, track issues, and view profiles — all inside a clean workspace-style dashboard.

This project is built using **React + Vite** and deployed on **AWS Amplify**, connected to a live backend deployed on **Render**.

---

## 🌐 Live Demo Links

✅ **Frontend (AWS Amplify):** https://main.d1ca4l9j49evry.amplifyapp.com  
✅ **Backend (Render):** https://vcs-backend-ynkn.onrender.com  

---

## 🧾 Project Overview

RepoSphere is designed to provide an interactive experience similar to GitHub, where users can explore their repositories, create new ones, raise issues, and manage profiles — all with a smooth UI and real backend integration.

Users can:
- Create an account and login securely  
- Access a dashboard that shows their repositories  
- Create repositories with name, description, visibility  
- View repository details pages  
- Browse issues, filter them and create new issues  
- View their profile details and logout safely  

RepoSphere is ideal for demonstrating **full stack development workflow** with real deployment experience (Frontend + Backend + Database).

---

## ✨ Features (Frontend)

### ✅ Authentication
- Signup (create new account)
- Login (existing account)
- Token stored in `localStorage`
- Protected routes (user is redirected to login if not authenticated)

### ✅ Dashboard
- Lists repositories of the logged-in user
- Select repo from sidebar list
- Modern workspace-style UI

### ✅ Repository Management
- Create repositories (Public / Private)
- View repository details using dynamic route (`/repo/:id`)

### ✅ Issue Management
- View all issues available
- Create new issue in modal
- Tabs for filtering:
  - Assigned to me
  - Created by me
  - Mentioned
  - Recent Activity
- Search issues by title

### ✅ Profile Page
- Displays user profile details via backend API
- Logout functionality clears token + user session

---

## 🛠️ Tech Stack (Frontend)

- **React (Vite)**
- **React Router DOM**
- **Axios + Fetch API**
- **Custom CSS Styling**
- **AWS Amplify Deployment**

---

## 🔗 Backend APIs Used (Frontend → Backend)

### 🔐 Authentication APIs
- `POST /signup` → Create new account  
- `POST /login` → Login and receive token  

### 👤 User APIs
- `GET /userProfile/:id` → Fetch user profile details  

### 📦 Repository APIs
- `POST /repo/create` → Create repository  
- `GET /repo/user/:userId` → Get all repositories created by the logged-in user  
- `GET /repo/:id` → Get repository details by ID  
- `GET /repo/all` → Get all repositories (used in Issues page)  

### 🐞 Issue APIs
- `GET /issue/all` → Fetch all issues  
- `POST /issue/create` → Create issue  

---

## ⚙️ Installation + Setup + Run (Local Development)


```bash
# Clone the repository
git clone https://github.com/DISHA7-debug/VCS-Frontend.git

# Go inside the folder
cd VCS-Frontend

# Install dependencies
npm install

# Start development server
npm run dev

The backend URL is stored inside:

📌 src/config.js

export const API_URL = "https://vcs-backend-ynkn.onrender.com";

src/
│── components/
│   ├── auth/                 # Login & Signup pages
│   │   ├── Login.jsx
│   │   ├── Signup.jsx
│   │   └── auth.css
│   │
│   ├── dashboard/            # Dashboard UI
│   │   ├── Dashboard.jsx
│   │   └── dashboard.css
│   │
│   ├── repo/                 # Repository pages
│   │   ├── CreateRepo.jsx
│   │   ├── RepoDetails.jsx
│   │   └── createRepo.css
│   │
│   ├── issue/                # Issues management UI
│   │   ├── Issue.jsx
│   │   └── issue.css
│   │
│   ├── user/                 # Profile page
│   │   ├── Profile.jsx
│   │   ├── HeatMap.jsx
│   │   └── profile.css
│   │
│   └── Navbar.jsx            # Shared Navbar component
│
│── assets/                   # Logos / icons / images
│── authContext.js            # Global auth state manager
│── Routes.jsx                # App routing + protection logic
│── config.js                 # Backend base URL
│── main.jsx                  # Entry point
│── App.jsx                   # App wrapper (if present)


---

## 👩‍💻 Author

**Disha Chopra**  
📌 Frontend Developer | React Developer  
🔗 GitHub: https://github.com/DISHA7-debug  

---
