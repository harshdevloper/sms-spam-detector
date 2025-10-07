import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-white to-orange-200 flex flex-col justify-center">
      <div className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-12 items-center">
        {/* Left Section - Text */}
        <div className="text-center md:text-left">
          <h1 className="text-5xl font-extrabold text-gray-800 leading-tight mb-6">
            🚀 Welcome to <span className="text-orange-600">SpamShield</span>
          </h1>

          <p className="text-lg text-gray-600 mb-10 max-w-lg">
            Your AI-powered SMS Spam Detection tool.  
            Detect spam instantly, protect your privacy, and enjoy a safer digital experience.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap justify-center md:justify-start gap-4">
            <Link
              to="/login"
              className="bg-orange-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-orange-700 transition"
            >
              🔑 Login
            </Link>
            <Link
              to="/register"
              className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-700 transition"
            >
              📝 Register
            </Link>
            <Link
              to="/dashboard"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition"
            >
              ✉️ Try Spam Detector
            </Link>
          </div>
        </div>

        {/* Right Section - Illustration */}
        <div className="flex justify-center">
          <img
            src="/image-illustration.png"
            alt="Spam detection illustration"
            className="w-96 drop-shadow-lg animate-bounce-slow"
          />
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center py-6 text-gray-500 text-sm border-t">
        © {new Date().getFullYear()} SpamShield. All rights reserved.
      </footer>
    </div>
  );
}

export default Home;
