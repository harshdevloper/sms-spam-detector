import React, { useState } from "react";
import { flaskAPI } from "../lib/axios";

const Multilangual = () => {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleDetect = async () => {
    if (!text.trim()) return alert("Please enter a message!");
    setLoading(true);
    setResult(null);

    try {
      const response = await flaskAPI.post("/spam-detect", {
        message: text,
      });

      setResult(response.data);
    } catch (error) {
      console.error("Error:", error);
      alert(
        error.response?.data?.error ||
          error.response?.data?.details ||
          error.message ||
          "Something went wrong. Try again!",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4 text-center text-indigo-600">
          📩 SMS Spam Detector
        </h2>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter SMS text here..."
          className="w-full border rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          rows={4}
        />

        <button
          onClick={handleDetect}
          className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition duration-200"
          disabled={loading}
        >
          {loading ? "Analyzing..." : "Detect Spam"}
        </button>

        {result && (
          <div className="mt-6 text-center">
            <h3
              className={`text-xl font-bold ${
                result.prediction === "Spam" ? "text-red-500" : "text-green-500"
              }`}
            >
              {result.prediction === "Spam"
                ? "🚨 Spam Message!"
                : "✅ Not Spam"}
            </h3>
            <p className="text-gray-600 mt-2">Language: {result.language}</p>
            <p className="text-gray-600">
              Translated: {result.translated_text}
            </p>
            <p className="text-gray-500 text-sm mt-2">
              Confidence: {result.probability}
            </p>
            <p className="mt-2 font-medium text-indigo-600">
              {result.hinglish}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Multilangual;
