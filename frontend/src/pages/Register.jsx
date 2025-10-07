import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { nodeAPI } from "../lib/axios.jsx";  // ✅ fix import

function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await nodeAPI.post("/auth/register", form); // ✅ use nodeAPI
      alert("User registered successfully ✅");
      navigate("/login");
    } catch (err) {
      if (err.response?.data) {
        const { msg, error } = err.response.data;
        setError(error ? `${msg} - ${error}` : msg || "Registration failed");
      } else if (err.message) {
        setError(err.message);
      } else {
        setError("Registration failed");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-orange-100 to-orange-200 px-4">
      <div className="max-w-4xl w-full bg-white shadow-xl rounded-2xl flex overflow-hidden">
        <div className="hidden md:block md:w-1/2 bg-[url('/register-illustration.png')] bg-cover bg-center"></div>

        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-3xl font-bold text-orange-600 mb-6 text-center">
            Create Account
          </h2>

          {error && (
            <p className="text-red-600 text-sm mb-4 text-center">{error}</p>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-orange-400 outline-none"
              value={form.name}
              onChange={handleChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-orange-400 outline-none"
              value={form.email}
              onChange={handleChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-orange-400 outline-none"
              value={form.password}
              onChange={handleChange}
            />

            <button
              type="submit"
              disabled={!form.name || !form.email || !form.password}
              className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                form.name && form.email && form.password
                  ? "bg-orange-600 text-white hover:bg-orange-700"
                  : "bg-gray-300 cursor-not-allowed"
              }`}
            >
              Register
            </button>
          </form>

          <p className="mt-4 text-sm text-center text-gray-500">
            Already have an account?{" "}
            <span
              className="text-orange-600 hover:underline cursor-pointer"
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
