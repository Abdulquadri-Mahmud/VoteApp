import React, { useState } from "react";
import Modal from "../../components/modal/Modal";
import { Link, useNavigate } from "react-router-dom";
import { signinFailure, signinStart, signinSuccess } from "../../store/user/userReducer";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const Login = () => {

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [modalContent, setModalContent] = useState({ show: false, title: "", message: "" });

  const {loading, error } = useSelector((state) => state.user);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  let navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signinStart());
      const endpoint = `https://vote-app-api.vercel.app/api/candidate-voter/auth/signin`;

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success === false) {
        dispatch(signinFailure(data.message));
        setModalContent({ show: true, title: "Error", message: data.message });
        return;
      }

      dispatch(signinSuccess(data));
      setModalContent({ show: true, title: "Success", message: "You have successfully logged in!" });
      setTimeout(() => navigate(`/profile/${data._id}`), 1500);

    } catch (error) {
      dispatch(signinFailure(error.message));
      setModalContent({ show: true, title: "Error", message: "An error occurred during login. Please try again." });
    }
  };

  const closeModal = () => {
    setModalContent({ ...modalContent, show: false });
  };

  return (
    <>
    <Header/>
      <div className="flex items-center justify-center py-20 bg-gradient-to-b from-blue-800 to-blue-400">
        <form onSubmit={handleSubmit} className="w-full max-w-md md:p-8 p-3 space-y-6 bg-white mx-3 md:mx-0 shadow-md rounded-lg">
          <h2 className="text-2xl font-bold text-center text-gray-800">Voters Login</h2>
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
              <Link to={'/forgot-password'} className="text-sm text-blue-500 underline font-semibold">Forgot password</Link>
            </div>
          </div>
          <button type="submit" className="w-full px-4 py-2 text-white bg-yellow-500 rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:outline-none">
            {
              loading ? 'Loading...' : 'Login'
            }
          </button>
          <div className="">
            <p className="text-sm">
              Not have an account?
              <Link to={'/voters-signup'} className="text-blue-900"> Sign Up</Link>
            </p>
          </div>
        </form>
        {modalContent.show && (
          <Modal onClose={closeModal}>
            <h2 className="text-2xl font-bold text-center text-gray-800">
              {modalContent.title}
            </h2>
            <p className="text-center py-4 text-gray-600 font-semibold">
              {modalContent.message}
            </p>
            <button onClick={closeModal} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:outline-none">
              Close
            </button>
          </Modal>
        )}
      </div>
      <Footer/>
    </>
  );
};

export default Login;
