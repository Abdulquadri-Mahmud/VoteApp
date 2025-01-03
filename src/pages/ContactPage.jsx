import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import ReCAPTCHA from "react-google-recaptcha";

const Contact = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  // State for form validation and captcha
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [captchaVerified, setCaptchaVerified] = useState(false);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Validate form fields
  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required.";
    if (!formData.email) newErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Invalid email address.";
    if (!formData.message) newErrors.message = "Message is required.";
    if (!captchaVerified) newErrors.captcha = "Please verify you are not a robot.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      alert("Form submitted successfully!");
      // Reset form
      setFormData({ name: "", email: "", message: "" });
      setCaptchaVerified(false);
    }
  };

  // Handle ReCaptcha verification
  const handleCaptcha = (value) => {
    setCaptchaVerified(true);
  };

  return (
    <div className="">
        <section className="py-16 bg-gradient-to-b from-blue-800 to-blue-400 text-white">
            <div className="container mx-auto px-2 lg:px-20">
                {/* Header Section */}
                <div  className="text-center mb-12"  data-aos="fade-up">
                <h1 className="text-5xl font-extrabold tracking-wide">
                    Get in <span className="text-yellow-300">Touch</span>
                </h1>
                <p className="text-lg mt-4">
                    Have questions or feedback? We’d love to hear from you. Fill out the form below <br /> or reach out to us directly.
                </p>
                </div>

                {/* Contact Form Section */}
                <div className="max-w-4xl mx-auto">
                    {/* Form */}
                    <div  data-aos="fade-right"  data-aos-delay="200">
                        <form onSubmit={handleSubmit}className="bg-white rounded-lg shadow-lg md:p-8 p-4 space-y-6 text-gray-800">
                            {/* Name Input */}
                            <div>
                                <label className="block text-lg font-medium mb-2" htmlFor="name">
                                Your Name
                                </label>
                                <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} placeholder="Enter your name" className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                    errors.name ? "border-red-500" : ""
                                }`} />
                                {errors.name && <p className="text-red-500 mt-1">{errors.name}</p>}
                            </div>

                            {/* Email Input */}
                            <div>
                                <label className="block text-lg font-medium mb-2" htmlFor="email">
                                Your Email
                                </label>
                                <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Enter your email" className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                    errors.email ? "border-red-500" : ""
                                }`} />
                                {errors.email && <p className="text-red-500 mt-1">{errors.email}</p>}
                            </div>

                            {/* Message Input */}
                            <div>
                                <label className="block text-lg font-medium mb-2" htmlFor="message">
                                Your Message
                                </label>
                                <textarea id="message" name="message" rows="5" value={formData.message} onChange={handleInputChange} placeholder="Write your message here..." className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                    errors.message ? "border-red-500" : ""
                                }`}></textarea>
                                {errors.message && <p className="text-red-500 mt-1">{errors.message}</p>}
                            </div>

                            {/* ReCaptcha */}
                            <div>
                                <ReCAPTCHA sitekey="YOUR_RECAPTCHA_SITE_KEY" // Replace with your Google ReCaptcha site key
                                onChange={handleCaptcha}/>
                                {errors.captcha && <p className="text-red-500 mt-1">{errors.captcha}</p>}
                            </div>

                            {/* Submit Button */}
                            <div className="text-center">
                                <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-all duration-300">
                                    Send Message
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
        {/* <Footer/> */}
    </div>
  );
};

export default Contact;
