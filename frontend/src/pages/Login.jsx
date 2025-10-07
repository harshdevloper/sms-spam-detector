import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { nodeAPI } from "../lib/axios.jsx";  // ✅ fix import

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await nodeAPI.post("/auth/login", form); // ✅ use nodeAPI
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.msg || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-orange-100 to-orange-200 px-4">
      <div className="max-w-4xl w-full bg-white shadow-xl rounded-2xl flex overflow-hidden">
        <div className="hidden md:block md:w-1/2 bg-[url('/login-illustration.png')] bg-cover bg-center"></div>
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-3xl font-bold text-primary mb-6 text-center">
            Login
          </h2>

          {error && (
            <p className="text-danger text-sm mb-4 text-center">{error}</p>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-orange-400 outline-none"
              onChange={handleChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-orange-400 outline-none"
              onChange={handleChange}
            />

            <button className="w-full py-3 bg-primary text-white rounded-lg hover:bg-orange-700 transition-colors font-semibold">
              Login
            </button>
          </form>

          <p className="mt-4 text-sm text-center text-gray-500">
            Don't have an account?{" "}
            <span
              className="text-primary hover:underline cursor-pointer"
              onClick={() => navigate("/register")}
            >
              Register
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
