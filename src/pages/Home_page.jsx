import React, { createContext, useState } from 'react'
import Hero from '../components/Hero'
import Features from '../components/Features'
import About from '../components/About';
import Steps from '../components/Steps';
import LiveCountDown from '../components/LiveCountDown';
import Header from '../components/Header';
import Footer from '../components/Footer';

export const featuresContext = createContext();
export const stepsContext = createContext();

export default function Home_page() {
    const [features] = useState([
        { id: 1, title: "Secure Voting", icon: "🔒" },
        { id: 2, title: "Real-time Results", icon: "📊" },
        { id: 3, title: "User-Friendly", icon: "✅" },
    ]);

    const steps = [
        { icon: "📝", description: "Register yourself by filling the required information." },
        { icon: "🔑", description: "Sign in as a user." },
        { icon: "📊", description: "Go to the voting option on the dashboard." },
        { icon: "🔒", description: "Provide your security key." },
        { icon: "🗳️", description: "Vote for your candidate and submit." },
    ];
    
    const [elections] = useState([
        { id: 1, name: "Presidential Election", date: "2025-01-10" },
        { id: 2, name: "Parliamentary Election", date: "2025-03-15" },
    ]);
    
    const userInfo = {
        name: "John Doe",
        email: "john.doe@example.com",
        role: "Voter",
    };

  return (
    <div>
        <Header/>
        <Hero/>

        {/* Features */}
        <featuresContext.Provider value={features}>
            <Features features={features}/>
        </featuresContext.Provider>
        <About/>

        {/* Stpes */}
        <stepsContext.Provider value={steps}>
            <Steps steps={steps}/>
        </stepsContext.Provider>

        {/* Live count down  */}
        <LiveCountDown/>
        <Footer/>
        {/*  */}
    </div>
  )
}
