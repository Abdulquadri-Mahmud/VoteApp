import React from "react";

const Layout = ({ children }) => (
  <div className="min-h-screen bg-gray-100 flex flex-col">
    <header className="bg-blue-600 text-white py-4">
      <h1 className="text-center text-xl">Face Recognition Voting System</h1>
    </header>
    <main className="flex-grow container mx-auto p-4">{children}</main>
    <footer className="bg-gray-800 text-white py-2 text-center">
      <p>&copy; 2024 Voting System</p>
    </footer>
  </div>
);

export default Layout;
