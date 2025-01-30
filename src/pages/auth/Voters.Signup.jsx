import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { signUpFailure, signUpStart, signUpSuccess } from '../../store/user/userReducer';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function VotersSignup() {
    const [formData, setFormData] = useState({});
    const [showModal, setShowModal] = useState(false); // To toggle modal visibility
    const [modalMessage, setModalMessage] = useState(""); // Modal message for success/error

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading } = useSelector((state) => state.user);

    const handleChange = (e) => {
        const {name, value} = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    }
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            dispatch(signUpStart());
            
            const endpoint = `https://vote-app-api.vercel.app/api/voter/auth/signup`;

            const res = await fetch(endpoint, {
                method: 'POST',
                headers: {'Content-Type' : 'application/json'},
                body: JSON.stringify(formData),
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

            setTimeout(() => navigate("/voters-login"), 1500);

        } catch (error) {
            dispatch(signUpFailure(err.message));
            setModalMessage("An error occurred during registration. Please try again.");
            setShowModal(true);
        }
    }

    const closeModal = () => {
        setShowModal(false);
    };

  return (
    <>
        <Header/>
            <div className="min-h-screen bg-gradient-to-b px-2 from-blue-800 to-blue-400">
                <div className='md:py-20 py-16'>
                    <form onSubmit={handleSubmit} className="md:max-w-xl max-w-[97%] bg-white rounded-md shadow-md md:p-6 p-3 mx-auto">
                        <div className="">
                            <h2 className="text-center md:text-3xl text-2xl font-bold">Voters Registration</h2>
                        </div>
                        <div className="mt-3">
                            <label htmlFor="fullname" className="block mb-2 text-sm font-medium text-gray-600">Full name</label>
                            <input type="text" name="fullname" placeholder="Full Name" onChange={handleChange} required className="px-2 py-3 outline-none border rounded-md w-full text-sm font-normal"/>
                        </div>
                        <div className="mt-3">
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-600">Email</label>
                            <input type="email" name="email" placeholder="Email" onChange={handleChange} required className="px-2 py-3 outline-none border rounded-md w-full text-sm font-normal"/>
                        </div>
                        <div className="mt-3">
                            <label htmlFor="votersCardNumber" className="block mb-2 text-sm font-medium text-gray-600">Voters Card Number</label>
                            <input type="text" name="votersCardNumber" placeholder="Voter Card Number" onChange={handleChange} required className="px-2 py-3 outline-none border rounded-md w-full text-sm font-normal"/>
                        </div>
                        <div className="mt-3">
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-600">Password</label>
                            <input type="password" name="password" placeholder="Password" onChange={handleChange} required className="px-2 py-3 outline-none border rounded-md w-full text-sm font-normal"/>
                        </div>
                        <div className="mt-3">
                            <button type="submit" className="w-full bg-yellow-500 text-white py-2 rounded-md font-semibold">
                                {loading ? "Loading..." : "Register as Voter"}
                            </button>
                        </div>
                        <div className="mt-5">
                            <p className="text-sm">
                                Already have an account?
                                <Link to={'/voters-login'} className="text-blue-900"> Sign In</Link>
                            </p>
                        </div>
                    </form>
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
        <Footer/>
    </>
  )
}
