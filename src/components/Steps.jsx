// Steps.js (Steps Section)
import React, { useContext, useEffect } from "react";
import { stepsContext } from "../pages/Home_page";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles

const Steps = () => {
  const steps = useContext(stepsContext);

  // Initialize AOS
  useEffect(() => {
    AOS.init({ duration: 1000, once: true }); // Once ensures animation happens only once on scroll
  }, []);

  return (
    <section className="py-20 bg-white mx-auto lg:px-0 px-3 max-w-6xl">
      <div className="container mx-auto text-center">
        <h2 className="lg:text-5xl text-4xl font-bold mb-14">Follow these easy steps</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg shadow-md"
              data-aos="fade-up" // Apply AOS animation
              data-aos-delay={`${index * 200}`} // Delay each step slightly for better effect
            >
              <div className="text-4xl text-blue-500">{step.icon}</div>
              <p className="text-lg font-medium text-gray-800">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Steps;
