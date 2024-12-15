import { KeyIcon } from "lucide-react";
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/UseAuth";

const Login: React.FC = () => {
  const { authentication, loading } = useAuth();

  const handleGoogleLogin = () => {
    window.open(
      `http://localhost:8080/api/v1/oauth2/authorization/google`,
      "_self"
    );
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (authentication) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-900">Login</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring focus:ring-blue-500"
              placeholder="Enter your username"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring focus:ring-blue-500"
              placeholder="Enter your password"
            />
          </div>
        </form>
        <div className="flex items-center justify-center">
          <button
            onClick={handleGoogleLogin}
            className="flex items-center justify-center w-full py-2 text-white bg-red-600 rounded-full hover:bg-red-700 transition-colors duration-150"
          >
            <KeyIcon className="mr-2" /> {/* Google icon */}
            Login with Google
          </button>
        </div>
        <p className="text-sm text-center text-gray-600">
          Don't have an account?{" "}
          <a href="/register" className="text-blue-600 hover:underline">
            Register here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
