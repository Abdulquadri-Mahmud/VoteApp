// Hero.js (Hero Section Component)
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Hero = () => {
    const { currentUser, error, loading } = useSelector((state) => state.user);
  
  return (
    <div className="2xl:h-[80vh] md:h-screen py-20 flex justify-center bg-gradient-to-b from-white to-blue-200 text-black text-center her">
        <div className="xl:max-w-[90%] mx-auto flex justify-around px-3 flex-wrap items-center">
            {/* Left Section */}
            <div className="flex-1 animate-staggered-fade text-center">
                <h1 className="sm:text-5xl text-4xl font-bold mb-4 animate-text-slide-in">
                    Let's Vote, Your Voice
                </h1>
                <p className="text-lg mb-6 text-center animate-fade-in-delay">
                    Every voice matters. Your vote shapes the future. By participating, you join millions in building a better tomorrow. 
                    Make your voice heard, and take part in decisions that define our path forward. Voting is not just a right—it's your power.
                </p>
                <div className="font-medium text-white">
                    <button className="bg-gradient-to-r from-blue-700 to-blue-300 hover:scale-110 hover:shadow-2xl transition-transform px-6 py-3 rounded-lg mr-4 shadow-lg animate-hover-glow">
                        <Link to={`${currentUser ? '/profile' : '/signup'}`}>Register</Link>
                    </button>
                    <button className="bg-gradient-to-r from-yellow-300 to-yellow-600 hover:scale-110 hover:shadow-2xl transition-transform px-6 py-3 rounded-lg shadow-lg animate-hover-glow">
                        <Link to={`${currentUser ? '/profile' : '/signup'}`}>Vote Now</Link>
                    </button>
                </div>
            </div>

            {/* Right Section */}
            <div className="md:w-[40%] w-full md:h-[450px] sm:h-[350px] flex justify-center relative animate-rotate-in">
                <img  src="/bg.png"  alt="Voting Banner"  className="h-full rounded-xl"/>
                <div className="absolute bottom-5 left-5 bg-black/60 text-white px-4 py-2 rounded-lg text-sm animate-fade-in-delay">
                    Make a Difference Today
                </div>
            </div>
        </div>
    </div>

  );
};

export default Hero;
