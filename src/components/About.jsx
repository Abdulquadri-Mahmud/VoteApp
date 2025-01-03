// About.js (About Section)
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css"; // Import the AOS styles

const About = () => {
  // Initialize AOS
  useEffect(() => {
    AOS.init({ duration: 1000 }); // Set the animation duration for a smoother experience
  }, []);

  return (
    <section className="py-16 px-3 bg-gradient-to-b from-blue-800 to-blue-400 text-white">
      <div className="mx-auto lg:px-6 max-w-5xl">
        {/* First Section: Why Choose Us */}
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="sm:text-5xl text-3xl font-extrabold mb-8 text-shadow-lg">
            About Us
          </h2>
          <p className="text-lg leading-relaxed text-opacity-90">
            Welcome to <span className="font-medium text-xl text-yellow-300">Vote</span>, a groundbreaking platform designed to make voting more accessible, secure, and efficient. Our mission is to empower individuals to participate in the democratic process with confidence, transparency, and ease, regardless of their location or technical experience.
            <br />
            <br />
            In a world where technology is transforming every aspect of life, we believe the future of voting should be no different. By leveraging cutting-edge technology, our app ensures that every vote is secure, verifiable, and counted without error. Whether it's a local election, a national vote, or a simple poll within your organization, we are here to support fair, transparent, and fast elections.
          </p>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16 px-3">
          <h3 className="text-2xl font-semibold text-white">
            Join Us in Shaping a More Inclusive Future
          </h3>
          <p className="text-lg text-opacity-80 mt-4">
            Together, we can make voting easier, faster, and more secure for everyone. <span className="font-medium">Your voice matters.</span>
          </p>
          <button className="mt-6 px-6 py-3 text-white bg-blue-500 rounded-lg hover:bg-blue-600 font-medium transition">
            Get Involved
          </button>
        </div>
      </div>
    </section>
  );
};

export default About;
