import React, { createContext } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home_page from '../pages/Home_page';
import Contact from '../pages/ContactPage';


import { FaFacebook, FaInstagramSquare, FaTwitter } from 'react-icons/fa';
import Footer from '../components/Footer';
import Header from '../components/Header';
import AboutPage from '../pages/AboutPgae';
import InteractiveMap from '../pages/InteractiveMap';

export const footerContext = createContext();


export default function RoutesApp() {
  const footerData = {
    contact: {
      phone: ["1800 9090 32", "1800 9090 64"],
      helpline: ["9090 1234 46", "9090 1234 47"],
      email: [
        "complaint@electionindia.gov.in",
        "info@electionindia.gov.in",
      ],
    },
    quickLinks: [
      { label: "Register", url: "/register" },
      { label: "Login", url: "/login" },
    ],
    socialLinks: [
      { icon: <FaFacebook/>, url: "https://twitter.com" },
      { icon: <FaTwitter />, url: "https://facebook.com" },
      { icon: <FaInstagramSquare />, url: "https://instagram.com" },
    ],
    feedbackLabel: "Quick Feedback",
};

  return (
    <Router>
        <Header/>

        <Routes>
          <Route path='/' element={<Home_page/>}/>
          <Route path='/about' element={<AboutPage/>}/>
          <Route path='/contact' element={<Contact/>}/>
          <Route path='/map' element={<InteractiveMap/>}/>
        </Routes>
        {/* Footer */}
        <footerContext.Provider value={footerData}>
            <Footer footerData={footerData}/>
        </footerContext.Provider>
    </Router>
  )
}
