import React, { useState } from "react";
import { flaskAPI } from "../lib/axios"; // correct import

const SpamDetector = () => {
  const [message, setMessage] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      // ✅ no duplicate /api here
      const response = await flaskAPI.post("/spam-detect", { message });
      setResult(response.data);
    } catch (err) {
      console.error("API Error:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-md mt-10">
      <h1 className="text-2xl font-bold mb-6 text-center">SMS Spam Detector</h1>

      <form onSubmit={handleSubmit}>
        <label
          htmlFor="message"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Enter SMS message:
        </label>
        <textarea
          id="message"
          rows="5"
          className="w-full border border-gray-300 rounded-md p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Type your SMS here..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        ></textarea>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition-colors disabled:opacity-50"
        >
          {loading ? "Checking..." : "Check Spam"}
        </button>
      </form>

      {error && <p className="mt-4 text-red-600 font-semibold">{error}</p>}

      {result && (
        <div
          className={`mt-6 p-4 rounded-md text-white font-semibold text-center ${
            result.result === "Spam" ? "bg-red-600" : "bg-green-600"
          }`}
        >
          {result.hinglish}
        </div>
      )}
    </div>
  );
};

export default SpamDetector;
