// Features.js
import React from "react";
import { FaLock, FaEthereum, FaLaptop, FaThumbsUp, FaDollarSign, FaClock } from "react-icons/fa";

const Features = () => {
  return (
    <div className="lg:max-w-[90%] mx-auto flex lg:justify-start justify-center">
      <div className="flex flex-col lg:flex-row items-center justify-center px-3 py-20">
        {/* Features Sidebar */}
        <div className="flex flex-col items-center justify-center lg:text-center text-start lg:h-[400px] lg:w-1/4 lg:border-r-4 border-blue-500">
          <h1 className="lg:text-6xl text-4xl font-bold lg:rotate-90 rotate-0 text-black">Features</h1>
          {/* <div className="w-2 h-20 bg-blue-500 mt-4 hidden lg:block"></div> */}
        </div>

        {/* Features List */}
        <div className="flex flex-col items-start lg:w-3/4 lg:pl-10 pt-6">
          <div className="flex items-center lg:mb-8 mb-6">
            <FaLock className="text-black text-2xl mr-4" />
            <p className="text-lg text-black">Secured by 256 bit encryption</p>
          </div>
          <div className="flex items-center lg:mb-8 mb-6">
            <FaEthereum className="text-black text-2xl mr-4" />
            <p className="text-lg text-black">Backed by Ethereum-based technology</p>
          </div>
          <div className="flex items-center lg:mb-8 mb-6">
            <FaLaptop className="text-black text-2xl mr-4" />
            <p className="text-lg text-black">Verifiable transactions</p>
          </div>
          <div className="flex items-center lg:mb-8 mb-6">
            <FaThumbsUp className="text-black text-2xl mr-4" />
            <p className="text-lg text-black">Easy to use</p>
          </div>
          <div className="flex items-center lg:mb-8 mb-6">
            <FaDollarSign className="text-black text-2xl mr-4" />
            <p className="text-lg text-black">Cheaper than ballot voting system</p>
          </div>
          <div className="flex items-center">
            <FaClock className="text-black text-2xl mr-4" />
            <p className="text-lg text-black">Faster voting process</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
