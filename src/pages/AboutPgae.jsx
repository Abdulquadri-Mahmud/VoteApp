import React, { useEffect } from "react";
import { FaLock, FaMobileAlt, FaGlobe, FaTree } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

const About = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration
      easing: "ease-in-out", // Easing style
      once: true, // Run animation only once
    });
  }, []);

  return (
    <>
      <Header/>
      <section className="bg-gradient-to-r from-blue-800 to-blue-400 text-white py-16">
        <div className="container mx-auto md:px-6 px-3 max-w-6xl">
          {/* Page Heading */}
          <div className="text-center mb-12" data-aos="fade-down">
            <h1 className="text-5xl font-extrabold mb-4">
              About <span className="text-yellow-300">VoteApp</span>
            </h1>
              Welcome to <span className="font-medium text-xl text-yellow-300">Vote</span>, a groundbreaking platform designed to make voting more accessible, secure, and efficient. Our mission is to empower individuals to participate in the democratic process with confidence, transparency, and ease, regardless of their location or technical experience.
              <br />
              <br />
              In a world where technology is transforming every aspect of life, we believe the future of voting should be no different. By leveraging cutting-edge technology, our app ensures that every vote is secure, verifiable, and counted without error. Whether it's a local election, a national vote, or a simple poll within your organization, we are here to support fair, transparent, and fast elections.
          </div>

          {/* Why Choose Us Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <div
              className="bg-white text-blue-900 p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <FaLock className="text-5xl text-blue-500 mb-4 mx-auto" />
              <h3 className="text-xl font-bold text-center mb-3">Secure</h3>
              <p className="text-center">
                Leveraging state-of-the-art encryption and blockchain technology,
                your vote is private and secure.
              </p>
            </div>
            <div
              className="bg-white text-blue-900 p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <FaMobileAlt className="text-5xl text-blue-500 mb-4 mx-auto" />
              <h3 className="text-xl font-bold text-center mb-3">Accessible</h3>
              <p className="text-center">
                Vote from anywhere using our intuitive and user-friendly platform
                on any device.
              </p>
            </div>
            <div
              className="bg-white text-blue-900 p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <FaGlobe className="text-5xl text-blue-500 mb-4 mx-auto" />
              <h3 className="text-xl font-bold text-center mb-3">Global</h3>
              <p className="text-center">
                Participate in elections no matter where you are in the world,
                breaking geographical barriers.
              </p>
            </div>
            <div
              className="bg-white text-blue-900 p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              <FaTree className="text-5xl text-blue-500 mb-4 mx-auto" />
              <h3 className="text-xl font-bold text-center mb-3">
                Environmentally Friendly
              </h3>
              <p className="text-center">
                By going digital, we eliminate the need for paper ballots,
                promoting sustainability.
              </p>
            </div>
          </div>

          {/* Vision and Mission Section */}
          <div
            className="bg-white text-blue-500 p-10 rounded-lg shadow-lg text-center"
            data-aos="zoom-in"
          >
            <h2 className="text-4xl font-bold mb-6 text-blue-900">Our Vision</h2>
            <p className="text-lg leading-relaxed mb-8">
              We envision a world where voting is accessible to everyone, secure,
              and completely transparent. By combining technology and innovation,
              we aim to transform the democratic process for future generations.
            </p>
            <h2 className="text-4xl font-bold mb-6 text-blue-900">Our Mission</h2>
            <p className="text-lg leading-relaxed">
              Our mission is to empower individuals by ensuring every vote counts,
              every voice is heard, and democracy thrives in a digital age.
            </p>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16" data-aos="fade-up">
            <h3 className="text-3xl font-bold mb-4">
              Ready to Make a Difference?
            </h3>
            <p className="mb-6">
              Join millions who trust VoteApp for a seamless, secure, and modern
              voting experience.
            </p>
            <button className="py-3 px-8 bg-yellow-500 text-blue-900 rounded-lg font-bold text-lg shadow-lg hover:bg-yellow-600 hover:shadow-2xl transition-all">
              Get Started
            </button>
          </div>
        </div>
      </section>
      <Footer/>
    </>
  );
};

export default About;
