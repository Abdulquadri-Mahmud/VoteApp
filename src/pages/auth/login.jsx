import React, { useState } from "react";
import Modal from "../../components/modal/Modal";
import { Link, useNavigate } from "react-router-dom";
import { signinFailure, signinStart, signinSuccess } from "../../store/user/userReducer";
import { useDispatch } from "react-redux";

const Login = () => {

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  let navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      dispatch(signinStart());

      if (!formData) {
        dispatch(signinFailure('An error occured while submitting form. Please try again later'));
        return;
      }
      
      console.log(formData);
      const {password: pass, ...rest} = formData;
      dispatch(signinSuccess(rest));

      navigate('/profile');

    } catch (error) {
      
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="flex items-center justify-center py-20 bg-gradient-to-b from-blue-800 to-blue-400">
      <form onSubmit={handleSubmit} className="w-full max-w-md p-8 space-y-6 bg-white mx-3 md:mx-0 shadow-md rounded-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-600"> Email Address</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className="w-full px-4 py-2 text-gray-800 bg-gray-100 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="Enter your email"/>
          </div>
          <div>
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-600">
              Password
            </label>
            <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required className="w-full px-4 py-2 text-gray-800 bg-gray-100 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="Enter your password"/>
          </div>
          <div className="flex items-center justify-between">
            <label className="flex items-center text-sm text-gray-600">
              <input type="checkbox" name="rememberMe" checked={formData.rememberMe} onChange={handleChange} className="mr-2 rounded"/>
              Remember Me
            </label>
            {/* <Link to="#" className="text-sm text-blue-500 hover:underline">
              Forgot Password?
            </Link> */}
          </div>
        </div>
        <button type="submit" className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"> Login</button>
        <div className="">
          <p className="text-sm">
            Not have an account?
            <Link to={'/signup'} className="text-blue-900"> Signup</Link>
          </p>
        </div>
      </form>
      {showModal && (
        <Modal onClose={closeModal}>
          <h2 className="text-2xl font-bold text-center text-gray-800">
            Success
          </h2>
          <p className="text-center text-gray-600">
            You have successfully logged in!
          </p>
          <button
            onClick={closeModal}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            Close
          </button>
        </Modal>
      )}
      
    </div>
  );
};

export default Login;
