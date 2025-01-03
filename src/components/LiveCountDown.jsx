import React, { useState, useEffect } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';  // Import AOS styles

const LiveCountDown = () => {
  const targetDate = new Date("2025-11-03T00:00:00Z"); // Set your target date here (e.g., next election date)
  
  const calculateTimeLeft = () => {
    const now = new Date();
    const difference = targetDate - now;
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    } else {
      timeLeft = {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    // Initialize AOS
    AOS.init({ duration: 1500 });
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    // Cleanup timer on component unmount
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="countdown-timer text-center py-12 mb-20 max-w-[90%] mx-auto" data-aos="fade-up">
      <h2 className="text-4xl font-semibold text-white mb-4" data-aos="fade-up">Next Major Election</h2>
      <p className="text-lg text-white mb-6" data-aos="fade-up">Hurry up! The next election is coming soon!</p>
      <div className="flex justify-center items-center space-x-4 text-white">
        <div className="timer-box" data-aos="zoom-in">
          <span className="timer-value">{timeLeft.days}</span>
          <p>Days</p>
        </div>
        <div className="timer-box" data-aos="zoom-in" data-aos-delay="200">
          <span className="timer-value">{timeLeft.hours}</span>
          <p>Hours</p>
        </div>
        <div className="timer-box" data-aos="zoom-in" data-aos-delay="400">
          <span className="timer-value">{timeLeft.minutes}</span>
          <p>Minutes</p>
        </div>
        <div className="timer-box" data-aos="zoom-in" data-aos-delay="600">
          <span className="timer-value">{timeLeft.seconds}</span>
          <p>Seconds</p>
        </div>
      </div>
    </div>
  );
};

export default LiveCountDown;
