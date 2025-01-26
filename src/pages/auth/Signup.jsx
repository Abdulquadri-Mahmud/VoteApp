import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signUpFailure, signUpStart, signUpSuccess } from "../../store/user/userReducer";
import { useNavigate } from "react-router-dom";

function Registration() {
  const [activeTab, setActiveTab] = useState("voter"); // Toggle between "voter" and "candidate"
  
  const [formData, setFormData] = useState({
    voter: { fullname: "", email: "", votersCardNumber: "", password: "" },
    candidate: { fullname: "", email: "", party: "", phone: "", password: "" },
  });

  const [showModal, setShowModal] = useState(false); // To toggle modal visibility
  const [modalMessage, setModalMessage] = useState(""); // Modal message for success/error

  const { loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e, type) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [type]: { ...prev[type], [name]: value },
    }));
  };

  const handleSubmit = async (e, type) => {
    e.preventDefault();
    dispatch(signUpStart());

    try {
      const endpoint = type === "voter" ? `https://vote-app-api.vercel.app/api/voter/auth/signup` : `https://vote-app-api.vercel.app/api/candidate-voter/auth/signup`;

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData[type]),
      });

      const data = await res.json();

      if (data.success === false) {
        dispatch(signUpFailure(data.message));
        setModalMessage(data.message);
        setShowModal(true);
        return;
      }

      dispatch(signUpSuccess());
      setModalMessage("Registration successful! You can now log in.");
      setShowModal(true);
      setFormData({
        voter: { fullname: "", email: "", votersCardNumber: "", password: "" },
        candidate: { fullname: "", email: "", party: "", phone: "", password: "" },
      });

      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      dispatch(signUpFailure(err.message));
      setModalMessage("An error occurred during registration. Please try again.");
      setShowModal(true);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="min-h-screen py-20 bg-gradient-to-b px-2 from-blue-800 to-blue-400">
      <div className="max-w-2xl mx-auto p-4 bg-white shadow-md rounded-lg">
        {/* Tabs */}
        <div className="flex border-b mb-4">
          <button className={`flex-1 py-2 px-4 ${activeTab === "voter" ? "border-b-2 border-blue-500 text-blue-500 font-bold" : "font-semibold"}`} onClick={() => setActiveTab("voter")}>
            Voter Registration
          </button>
          <button className={`flex-1 py-2 px-4 ${activeTab === "candidate" ? "border-b-2 border-blue-500 text-blue-500 font-bold" : "font-semibold"}`}
            onClick={() => setActiveTab("candidate")}>
            Candidate Registration
          </button>
        </div>

        {/* Forms */}
        {activeTab === "voter" && (
          <form onSubmit={(e) => handleSubmit(e, "voter")}>
            <div className="grid grid-cols-1 gap-3">
              <div className="">
                <p className={`${activeTab === 'voter' ? 'pb-2 text-sm text-gray-600' : 'text-black'} font-semibold`}>Full name</p>
                <input type="text" name="fullname" placeholder="Full Name" value={formData.voter.fullname} onChange={(e) => handleChange(e, "voter")} required className="px-2 py-3 outline-none border rounded-md w-full"/>
              </div>
              <div className="">
                <p className={`${activeTab === 'voter' ? 'pb-2 text-sm text-gray-600' : 'text-black'} font-semibold`}>Email</p>
                <input type="email" name="email" placeholder="Email" value={formData.voter.email} onChange={(e) => handleChange(e, "voter")} required className="px-2 py-3 outline-none border rounded-md w-full"/>
              </div>
              <div className="">
                <p className={`${activeTab === 'voter' ? 'pb-2 text-sm text-gray-600' : 'text-black'} font-semibold`}>Voter Card Number</p>
                <input type="text" name="votersCardNumber" placeholder="Voter Card Number" value={formData.voter.votersCardNumber} onChange={(e) => handleChange(e, "voter")} required className="px-2 py-3 outline-none border rounded-md w-full"/>
              </div>
              <div className="">
                <p className={`${activeTab === 'voter' ? 'pb-2 text-sm text-gray-600' : 'text-black'} font-semibold`}>Password</p>
                <input type="password" name="password" placeholder="Password" value={formData.voter.password} onChange={(e) => handleChange(e, "voter")} required className="px-2 py-3 outline-none border rounded-md w-full"/>
              </div>
              <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md font-semibold">
                {loading ? "Loading..." : "Register as Voter"}
              </button>
            </div>
          </form>
        )}

        {activeTab === "candidate" && (
          <form onSubmit={(e) => handleSubmit(e, "candidate")}>
            <div className="grid grid-cols-1 gap-3">
              <div className="">
                <p className={`${activeTab === 'candidate' ? 'pb-2 text-sm text-gray-600' : 'text-black'} font-semibold`}>Full name</p>
                <input type="text" name="fullname" placeholder="Full Name" value={formData.candidate.fullname} onChange={(e) => handleChange(e, "candidate")} required className="px-2 py-3 outline-none border rounded-md w-full"/>
              </div>
              <div className="">
                <p className={`${activeTab === 'candidate' ? 'pb-2 text-sm text-gray-600' : 'text-black'} font-semibold`}>Email</p>
                <input type="email" name="email" placeholder="Email" value={formData.candidate.email} onChange={(e) => handleChange(e, "candidate")} required className="px-2 py-3 outline-none border rounded-md w-full"/>
              </div>
              <div className="">
                <p className={`${activeTab === 'candidate' ? 'pb-2 text-sm text-gray-600' : 'text-black'} font-semibold`}>Party</p>
                <select name="party" value={formData.candidate.party} onChange={(e) => handleChange(e, "candidate")} required className="px-2 py-3 outline-none border rounded-md w-full" >
                  <option value="">Select Party</option>
                  <option value="NNPP">NNPP</option>
                  <option value="APGA">LP</option>
                  <option value="APGA">YPP</option>
                  <option value="APGA">ADC</option>
                  <option value="APGA">SDP</option>
                  <option value="APGA">APGA</option>
                  <option value="APC">APC</option>
                  <option value="PDP">PDP</option>
                </select>
              </div>
              <div className="">
                <p className={`${activeTab === 'candidate' ? 'pb-2 text-sm text-gray-600' : 'text-black'} font-semibold`}>Phone</p>
                <input type="text" name="phone" placeholder="Phone" value={formData.candidate.phone} onChange={(e) => handleChange(e, "candidate")} required className="px-2 py-3 outline-none border rounded-md w-full"/>
              </div>
              <div className="">
                <p className={`${activeTab === 'candidate' ? 'pb-2 text-sm text-gray-600' : 'text-black'} font-semibold`}>Password</p>
                <input type="password" name="password" placeholder="Password" value={formData.candidate.password} onChange={(e) => handleChange(e, "candidate")} required className="px-2 py-3 outline-none border rounded-md w-full"/>
              </div>
              <button type="submit" className="w-full bg-blue-500 text-white py-2 font-semibold rounded-md">
                {loading ? "Loading..." : "Register as Candidate"}
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-center mb-4">Registration</h2>
            <p className="text-center text-lg mb-4 font-semibold">{modalMessage}</p>
            <button onClick={closeModal} className="bg-blue-500 text-white py-2 px-6 rounded-md">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Registration;
