// RegistrationForm.js (Registration Form Component)
import React from "react";

const RegistrationForm = () => {
  return (
    <section className="py-16 bg-gray-800">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">Registration Form</h2>
        <form className="max-w-md mx-auto">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full mb-4 p-3 rounded-lg bg-gray-700"
          />
          <input
            type="email"
            placeholder="Email Address"
            className="w-full mb-4 p-3 rounded-lg bg-gray-700"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full mb-4 p-3 rounded-lg bg-gray-700"
          />
          <button className="w-full bg-blue-500 p-3 rounded-lg">Submit</button>
        </form>
      </div>
    </section>
  );
};

export default RegistrationForm;