import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { useSelector } from "react-redux";
import { FaUserAlt } from "react-icons/fa";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
    const { currentUser, error, loading } = useSelector((state) => state.user);
  

  return (
    <header className="sticky top-0 z-20 bg-gradient-to-r from-blue-800 to-blue-400 shadow-lg">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <h1 className="text-3xl font-extrabold text-white tracking-wide">
            Vote<span className="text-yellow-300">App</span>
          </h1>
        </div>

        {/* Hamburger Icon for Mobile */}
        <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden text-3xl text-white hover:scale-110 transition-transform" aria-label="Toggle Menu">
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>

        {/* Navigation Menu */}
        <nav className={`absolute top-full left-0 md:py-0 py-6 md:max-w-[30%] w-full bg-blue-800 lg:bg-transparent lg:static  transition-all duration-500 ease-in-out ${
            menuOpen ? "opacity-100 visible bg-gradient-to-r from-blue-800 to-blue-400 shadow-lg" : "opacity-0 invisible lg:opacity-100 lg:visible "
          }`}>
          <ul className="flex flex-col lg:flex-row items-center space-y-6 lg:space-y-0 lg:space-x-8 text-lg font-semibold">
            <li>
              <Link to="/" className="text-white hover:text-yellow-300 transition-colors duration-300">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="text-white hover:text-yellow-300 transition-colors duration-300">
                About
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-white hover:text-yellow-300 transition-colors duration-300">
                Contact
              </Link>
            </li>
            <li>
              <Link to={`${ currentUser ? '/profile' : '/login'}`} className={`${currentUser ? '' : ' py-2 px-6 text-white bg-yellow-400 hover:bg-yellow-500 rounded-full shadow-md transition-all duration-300 hover:scale-110 hover:shadow-xl'}`}> 
                {
                  currentUser ? (
                    <>
                      <FaUserAlt className="text-white"/>
                    </>
                  ) : 'Login'
                }
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
