import { useState } from "react";
import { Link } from "react-router-dom"; // ✅ Import Link for navigation

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    alert(data.message);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md"
      >
        <div className="mb-8">
          <h2 className="text-3xl font-semibold text-center text-indigo-700">
            Register
          </h2>
          <p className="text-center text-gray-500 mt-2">Create your account</p>
        </div>

        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            placeholder="Enter your username"
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow duration-300"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow duration-300"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          className="w-full bg-gradient-to-r from-green-400 to-blue-500 text-white py-3 rounded-md hover:from-green-500 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:ring-green-400 transition-colors duration-300"
          type="submit"
        >
          Register
        </button>

        {/* ✅ Add "Have an account? Sign in" link */}
        <p className="text-center text-gray-600 mt-4">
          Have an account?{" "}
          <Link
            to="/login"
            className="text-indigo-600 font-semibold hover:underline"
          >
            Sign in
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
