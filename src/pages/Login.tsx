import { KeyIcon } from "lucide-react";
import React from "react";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../hooks/UseAuth";
import configuration from "../configuration/EnvConfig";

const Login: React.FC = () => {
  const { authentication, loading } = useAuth();

  const handleGoogleLogin = () => {
    window.open(
      `${configuration.BACKEND_URL}/oauth2/authorization/google`,
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
    <div className="max-w-3xl xl:max-w-7xl px-4 m-auto">
      <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
        <div className="flex items-center justify-center py-12">
          <div className="mx-auto grid w-[350px] gap-6">
            <div className="grid gap-2">
              <h1 className="text-3xl font-bold">Login</h1>
              <p className="text-balance text-muted-foreground">
                Enter your email below to login to your account
              </p>
            </div>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-primary transition-colors duration-300"
                  placeholder="Enter your email"
                />
              </div>
              <div className="grid gap-2">
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-primary transition-colors duration-300"
                  placeholder="Enter your password"
                />
              </div>
              <button
                onClick={handleGoogleLogin}
                className="mt-4 flex items-center justify-center w-full py-2 text-white bg-red-500 rounded-full hover:bg-red-700 transition-colors duration-300"
              >
                <KeyIcon className="mr-2" />
                Login with Google
              </button>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link to="/#" className="underline">
                Sign up
              </Link>
            </div>
          </div>
        </div>
        <div className="hidden lg:flex lg:flex-col lg:justify-center">
          <img
            src="https://hire-quotient-notion-clone-aashish.vercel.app/assets/hero1-HqjeD6Yh.png"
            alt="Image"
            className="h-1/2 w-full object-contain dark:backdrop-invert rounded-2xl"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
