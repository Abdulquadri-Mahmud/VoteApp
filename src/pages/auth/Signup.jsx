import React, { useState } from "react";

function Registration() {
  const [activeTab, setActiveTab] = useState("voter"); // Toggle between "voter" and "candidate"
  const [formData, setFormData] = useState({
    voter: { fullname: "", email: "", voterCardNumber: "", password: "", confirmPassword: "" },
    candidate: { fullname: "", email: "", party: "", phone: "", password: "", confirmPassword: "" },
  });
  const [showModal, setShowModal] = useState(false); // To toggle modal visibility

  const handleChange = (e, type) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [type]: { ...prev[type], [name]: value },
    }));
  };

  const handleSubmit = (e, type) => {
    e.preventDefault();
    console.log(`${type} data submitted:`, formData[type]);
    setShowModal(true); // Show modal after form submission
  };

  const closeModal = () => {
    setShowModal(false); // Close modal
  };

  return (
    <div className="min-h-screen py-20 bg-gradient-to-b from-blue-800 to-blue-400">
      <div className="max-w-2xl mx-auto p-4 bg-white shadow-md rounded-lg">
        {/* Tabs */}
        <div className="flex border-b mb-4">
          <button
            className={`flex-1 py-2 px-4 ${activeTab === "voter" ? "border-b-2 border-blue-500 text-blue-500 font-bold" : ""}`}
            onClick={() => setActiveTab("voter")}
          >
            Voter Registration
          </button>
          <button
            className={`flex-1 py-2 px-4 ${activeTab === "candidate" ? "border-b-2 border-blue-500 font-bold text-blue-500" : ""}`}
            onClick={() => setActiveTab("candidate")}
          >
            Candidate Registration
          </button>
        </div>

        {/* Forms with smooth transitions */}
        <div className="relative h-full">
          <div className={`transition-opacity duration-500 ${activeTab === "voter" ? "opacity-100" : "opacity-0 absolute"}`}>
            {/* Voter Registration Form */}
            <form onSubmit={(e) => handleSubmit(e, "voter")}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Full Name</label>
                <input
                  type="text"
                  name="fullname"
                  value={formData.voter.fullname}
                  onChange={(e) => handleChange(e, "voter")}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.voter.email}
                  onChange={(e) => handleChange(e, "voter")}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Voter Card Number</label>
                <input
                  type="text"
                  name="voterCardNumber"
                  value={formData.voter.voterCardNumber}
                  onChange={(e) => handleChange(e, "voter")}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.voter.password}
                  onChange={(e) => handleChange(e, "voter")}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.voter.confirmPassword}
                  onChange={(e) => handleChange(e, "voter")}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>
              <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md">
                Register as Voter
              </button>
            </form>
          </div>

          <div className={`transition-opacity duration-500 ${activeTab === "candidate" ? "opacity-100" : "opacity-0 absolute"}`}>
            {/* Candidate Registration Form */}
            <form onSubmit={(e) => handleSubmit(e, "candidate")}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Full Name</label>
                <input
                  type="text"
                  name="fullname"
                  value={formData.candidate.fullname}
                  onChange={(e) => handleChange(e, "candidate")}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.candidate.email}
                  onChange={(e) => handleChange(e, "candidate")}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Party</label>
                <select
                  name="party"
                  value={formData.candidate.party}
                  onChange={(e) => handleChange(e, "candidate")}
                  className="w-full p-2 border rounded-md"
                  required
                >
                  <option value="">Select Party</option>
                  <option value="NNPP">NNPP</option>
                  <option value="APGA">APGA</option>
                  <option value="APC">APC</option>
                  <option value="PDP">PDP</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.candidate.phone}
                  onChange={(e) => handleChange(e, "candidate")}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.candidate.password}
                  onChange={(e) => handleChange(e, "candidate")}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.candidate.confirmPassword}
                  onChange={(e) => handleChange(e, "candidate")}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>
              <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md">
                Register as Candidate
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Modal for Success */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-center mb-4">Registration Successful!</h2>
            <p className="text-center text-lg mb-4">Your registration was successful. Thank you for registering!</p>
            <div className="flex justify-center">
              <button
                onClick={closeModal}
                className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Registration;
