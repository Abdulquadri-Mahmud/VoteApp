import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import VotingPanel from "./voteSection/VoteSection";
import { useDispatch, useSelector } from "react-redux";
import { updateFailure, updateStart, updateSuccess } from "../../store/user/userReducer";
import VoterLogoutButton from "./VoterLogout";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Profile = () => {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [activeTab, setActiveTab] = useState("Personal Info");
  const [formData, setFormData] = useState({
    fullname: currentUser.fullname,
    email: currentUser.email,
    votersCardNumber: currentUser.votersCardNumber,
    password: "",
  });
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false); // New state for success modal

  const dispatch = useDispatch();
  const { id } = useParams();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateStart());
      const endpoint = `https://vote-app-api.vercel.app/api/voter/auth/update_user/${id}`;

      const res = await fetch(endpoint, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success === false) {
        dispatch(updateFailure(data.message));
        setShowErrorModal(true);
        return;
      }

      dispatch(updateSuccess(data));
      setShowSuccessModal(true); // Show success modal
    } catch (error) {
      dispatch(updateFailure(error.message));
      setShowErrorModal(true);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case "Personal Info":
        return (
          <div className="text-gray-800">
            <form className="mt-6" onSubmit={handleSubmit}>
              <div className="mb-3">
                <p className="text-gray-600 font-medium pb-2">Full Name:</p>
                <input onChange={handleChange} id="fullname" type="text" className="p-3 border-2 border-gray-200 outline-none w-full rounded-md text-sm" defaultValue={currentUser.fullname}/>
              </div>
              <div className="mb-3">
                <p className="text-gray-600 font-medium pb-2">Email:</p>
                <input onChange={handleChange} id="email" type="email" className="p-3 border-2 border-gray-200 outline-none w-full rounded-md text-sm" defaultValue={currentUser.email}/>
              </div>
              <div className="mb-3">
                <p className="text-gray-600 font-medium pb-2">Voter's Card Number:</p>
                <input onChange={handleChange} id="votersCardNumber" type="text" className="p-3 border-2 border-gray-200 outline-none w-full rounded-md text-sm" defaultValue={currentUser.votersCardNumber}/>
              </div>
              <div className="mb-3">
                <p className="text-gray-600 font-medium pb-2">Password:</p>
                <input onChange={handleChange} id="password" type="password" className="p-3 border-2 border-gray-200 outline-none w-full rounded-md text-sm"/>
              </div>
              <div className="flex justify-between items-center mt-3">
                <button  type="submit"  className="w-[200px] py-2 bg-yellow-500 text-white uppercase font-medium rounded-md">
                  {loading ? "Loading..." : "Save Changes"}
                </button>
                <VoterLogoutButton />
              </div>
            </form>
          </div>
        );
      case "Vote":
        return (
          <div className="text-gray-800">
            <h2 className="text-xl font-bold mb-2 text-center">Vote Section</h2>
            <p className="text-sm font-normal mb-4 text-center">Cast your vote securely in this section.</p>
            <VotingPanel />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="">
      <Header/>
        <div className="min-h-screen py-10 px-2 bg-gradient-to-b from-blue-900 to-blue-400">
          <div className="bg-white mx-3 text-gray-800 max-w-full lg:max-w-5xl md:mx-auto rounded-lg overflow-hidden shadow-lg">
            <div className="flex justify-between items-center bg-blue-700 px-6 py-4">
              <div className="flex space-x-6">
                {["Personal Info", "Vote"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`text-gray-800 font-semibold px-4 py-2 rounded-md transition duration-300 ${activeTab === tab ? "bg-blue-600 text-white w-[150px]" : "hover:bg-blue-600 text-white"}`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>
            <div className="p-6 transition-opacity duration-300">{renderContent()}</div>
          </div>
          {showErrorModal && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
                <h2 className="text-lg font-bold text-red-600">Error</h2>
                <p className="mt-2 text-gray-700">{error || "An unexpected error occurred."}</p>
                <button
                  className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md"
                  onClick={() => setShowErrorModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          )}
          {showSuccessModal && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
                <h2 className="text-lg font-bold text-green-600">Success</h2>
                <p className="mt-2 text-gray-700">Your information has been successfully updated!</p>
                <button
                  className="mt-4 px-4 py-2 bg-green-600 text-white rounded-md"
                  onClick={() => setShowSuccessModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      <Footer/>
    </div>
  );
};

export default Profile;
