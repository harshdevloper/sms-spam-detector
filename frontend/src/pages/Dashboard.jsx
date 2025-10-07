import React from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-r from-orange-50 to-orange-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-xl p-6 flex flex-col">
        <h2 className="text-2xl font-bold text-orange-600 mb-8">📊 Dashboard</h2>
        <nav className="space-y-4 flex-1">
          <button
            onClick={() => navigate("/")}
            className="w-full text-left p-3 rounded-lg hover:bg-orange-100 transition"
          >
            🏠 Home
          </button>
          <button
            onClick={() => navigate("/spam-detector")}
            className="w-full text-left p-3 rounded-lg hover:bg-orange-100 transition"
          >
            ✉️ Spam Detector
          </button>
          <button className="w-full text-left p-3 rounded-lg hover:bg-orange-100 transition">
            ⚙️ Settings
          </button>
        </nav>
        <button
          onClick={handleLogout}
          className="mt-auto bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition"
        >
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10">
        {/* Topbar */}
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-bold text-gray-800">
            Welcome back, <span className="text-orange-600">{user?.name}</span> 👋
          </h1>
          <div className="bg-white shadow-md p-3 rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold text-orange-600">
            {user?.name?.[0]?.toUpperCase()}
          </div>
        </div>

        {/* User Info Card */}
        <div className="bg-white shadow-lg rounded-xl p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">👤 Profile Info</h2>
          <p><span className="font-medium">Name:</span> {user?.name}</p>
          <p><span className="font-medium">Email:</span> {user?.email}</p>
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-xl font-semibold text-gray-700 mb-4">⚡ Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div
              onClick={() => navigate("/spam-detector")}
              className="bg-gradient-to-r from-orange-400 to-orange-600 text-white p-6 rounded-xl shadow-lg hover:scale-105 transition cursor-pointer"
            >
              <h3 className="text-lg font-bold">Check Spam</h3>
              <p className="text-sm">Detect spam messages instantly</p>
            </div>
            <div className="bg-gradient-to-r from-green-400 to-green-600 text-white p-6 rounded-xl shadow-lg hover:scale-105 transition cursor-pointer">
              <h3 className="text-lg font-bold">View Reports</h3>
              <p className="text-sm">Check your spam detection history</p>
            </div>
            <div className="bg-gradient-to-r from-blue-400 to-blue-600 text-white p-6 rounded-xl shadow-lg hover:scale-105 transition cursor-pointer">
              <h3 className="text-lg font-bold">Settings</h3>
              <p className="text-sm">Manage your account preferences</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
