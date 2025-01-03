// Footer.js (Footer Section)
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { IoIosSend } from "react-icons/io";
import { footerContext } from "../routes/Routes";
const Footer = () => {
  const footerData = useContext(footerContext);

  const { contact, quickLinks, socialLinks, feedbackLabel } = footerData;
  
  return (
    <footer className="py-8 bg-gray-800 text-white px-3">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8">
        {/* Contact Section */}
        <div className="md:border-r-2 md:pt-0 pt-4 border-gray-600">
          <h3 className="text-xl text-blue-500 font-medium mb-4">Contact</h3>
          <p>Contact: {contact.phone.join(", ")}</p>
          <p>Helpline: {contact.helpline.join(", ")}</p>
          <div className="mt-5">
            Email:{" "}
            {contact.email.map((email, index) => (
              <p key={index} className="block py-1">
                {email}
              </p>
            ))}
          </div>
        </div>

        <div className="w-full md:border-r-2 md:pt-0 pt-4 border-gray-600 md:px-5 px-0">
          <div className="grid lg:grid-cols-3 grid-cols-1 w-full">
            {/* Quick Links Section */}
            <div>
              <h3 className="text-xl text-blue-500 font-medium mb-4">Get In</h3>
              <ul>
                {quickLinks.map((link, index) => (
                  <li key={index} className="mb-2">
                    <Link to={link.url} className="hover:underline">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            
            <div className="">
              <h3 className="text-xl text-blue-500 font-medium mb-4">Know more</h3>
              <ul className="mt-4">
                <li>
                  <Link to={'/'}>Facebook</Link>
                </li>
                <li>
                  <Link to={'/'}>Instagram</Link>
                </li>
                <li>
                  <Link to={'/'}>Twitter</Link>
                </li>
              </ul>
            </div>

            <div className="">
              <h3 className="text-xl text-blue-500 font-medium mb-4">Follow Us</h3>
              <ul className="mt-4">
                <li>
                  <Link to={'/'}>Facebook</Link>
                </li>
                <li>
                  <Link to={'/'}>Instagram</Link>
                </li>
                <li>
                  <Link to={'/'}>Twitter</Link>
                </li>
              </ul>
            </div>

          </div>
          {/* Social Links Section */}
          <div className="w-full flex justify-center mt-12">
            <div className="flex space-x-4">
              {socialLinks.map((link, index) => (
                <Link key={index} to={link.url} target="_blank" rel="noopener noreferrer" className="text-4xl text-blue-500 hover:text-blue-500">
                  {link.icon}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Feedback Section */}
        <div>
          <h3 className="text-xl text-blue-500 font-medium mb-4 md:border-t-0 border-t md:pt-0 pt-4 border-gray-700">{feedbackLabel}</h3>
          <form className="space-y-3">
            <input type="text" className="w-full py-2 rounded-md"/>
            <textarea className="w-full p-2 mb-4 rounded h-[100px] text-white" placeholder="Enter your feedback"></textarea>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 hover:bg-blue-400 rounded text-white flex items-center font-medium"
            >
              <IoIosSend className="text-2xl"/>
              Send
            </button>
          </form>
        </div>
      </div>
      <p className="text-center mt-6 text-sm">
        &copy; {new Date().getFullYear()} Vote Design. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
