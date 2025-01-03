// Login.js (Login Form Component)
import React from "react";

const Login = () => {
  return (
    <section className="py-16 bg-gray-800">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">Login</h2>
        <form className="max-w-md mx-auto">
          <input
            type="email"
            placeholder="Email Address"
            className="w-full mb-4 p-3 rounded-lg bg-gray-700"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full mb-4 p-3 rounded-lg bg-gray-700"
          />
          <button className="w-full bg-blue-500 p-3 rounded-lg">Login</button>
        </form>
      </div>
    </section>
  );
};

export default Login;