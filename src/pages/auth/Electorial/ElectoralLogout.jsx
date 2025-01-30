import React from "react";
import { useDispatch } from "react-redux";
import { signOutUserSuccess } from "../../../store/user/ElectorialReducer"; // Adjust the import path if necessary
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignOut = () => {
    dispatch(signOutUserSuccess()); // Clear user state
    navigate("/electorial-login"); // Redirect to login page
  };

  return (
    <div className="w-full">
      <button onClick={handleSignOut} className="px-4 py-2 w-full bg-white text-red-500 font-semibold rounded-lg hover:text-white hover:bg-red-600 transition duration-200">
        Sign Out
      </button>
    </div>
  );
};

export default LogoutButton;
