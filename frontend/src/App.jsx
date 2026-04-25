import { Routes, Route } from "react-router-dom"; 
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import SpamDetector from "./pages/SpamDetector.jsx";  
import Home from "./pages/Home.jsx";   // <-- New Home Page
import Multilangual from "./pages/Multilangual.jsx"; // 

function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Home />} />
      

      {/* Protected routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/spam-detector"
        element={
          <ProtectedRoute>
            <SpamDetector />
          </ProtectedRoute>
        }
      />

      <Route
        path="/multilangual"
        element={
          <ProtectedRoute>
            <Multilangual />
          </ProtectedRoute>
        }
      />

    </Routes>
  );
}

export default App;
