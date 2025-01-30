import { signOutUserSuccess } from "@/store/user/userReducer";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const VoterLogoutButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignOut = () => {
    dispatch(signOutUserSuccess()); // Clear user state
    navigate("/voters-login"); // Redirect to login page
  };

  return (
    <div className="">
      <button onClick={handleSignOut} className="px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:text-white hover:bg-red-600 transition duration-200">
        Sign Out
      </button>
    </div>
  );
};

export default VoterLogoutButton;
