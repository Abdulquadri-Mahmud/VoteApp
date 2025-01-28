import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signUpFailure, signUpStart, signUpSuccess } from "../store/user/userReducer";
import { MdOutlineCloudUpload } from "react-icons/md";

function NewCandidate() {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    party: "",
    phone: "",
    password: "",
    image: "", // Added field for image URL
  });

  const [showModal, setShowModal] = useState(false); // To toggle modal visibility
  const [modalMessage, setModalMessage] = useState(""); // Modal message for success/error
  const [imageUploading, setImageUploading] = useState(false); // Track image upload status

  const { loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpload = async (e) => {
    console.log('ggg');
    
    window.cloudinary.openUploadWidget(
      {
        cloudName: "dypn7gna0",
        uploadPreset: "magkk_football_talk",
        sources: ["local", "url", "camera"],
        multiple: false, // Allow multiple uploads false
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          const uploadedUrl = result.info.secure_url; // Get the secure URL for the uploaded file
  
          // Update the formData.image array incrementally
          setFormData((prevFormData) => ({
            ...prevFormData,
            image: [...prevFormData.image, uploadedUrl],
          }));
  
          // alert(`Image uploaded successfully! URL: ${uploadedUrl}`);
        } else if (error) {
          console.error("Upload Error:", error);
          alert("An error occurred during upload.");
        }
      }
    );
  }
    console.log(formData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(signUpStart());

    try {
      const res = await fetch(`https://vote-app-api.vercel.app/api/candidate-voter/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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
      setFormData({ fullname: "", email: "", party: "", phone: "", password: "", image: "" });

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
    <div className="md:py-14 py-10 bg-gradient-to-b px-2 ">
      <div className="max-w-3xl mx-auto p-4 bg-white shadow-md rounded-lg">
        <form onSubmit={handleSubmit}>

            <div className="flex justify-center">
                <div className="mb-7 w-[200px] rounded-md p-3 bg-gray-200">
                    <div className="flex justify-center">
                        <div className="w-[100px] h-[100px] rounded-full border flex justify-center items-center border-blue-500">
                            <img src={`${formData.image}`} alt="" className={`max-w-[100px] max-h-[100px] rounded-full object-fill`}/>
                        </div>
                    </div>
                    <button onClick={handleUpload} type='button' className='w-[100%] flex justify-center rounded-md mt-3 mx-auto bg-yellow-500 p-2'>
                        <MdOutlineCloudUpload className="text-3xl text-white"/>
                    </button>
                </div>
            </div>

            <div className="grid md:grid-cols-2 grid-cols-1 gap-3">
                <div>
                    <p className="pb-2 text-sm text-gray-600 font-semibold">Full name</p>
                    <input type="text" name="fullname" placeholder="Full Name" value={formData.fullname} onChange={handleChange} required className="px-2 py-3 outline-none border rounded-md w-full"/>
                </div>
                <div>
                    <p className="pb-2 text-sm text-gray-600 font-semibold">Email</p>
                    <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required className="px-2 py-3 outline-none border rounded-md w-full"/>
                </div>
                <div>
                    <p className="pb-2 text-sm text-gray-600 font-semibold">Party</p>
                    <select name="party" value={formData.party} onChange={handleChange} required className="px-2 py-3 outline-none border rounded-md w-full" >
                        <option value="">Select Party</option>
                        <option value="NNPP">NNPP</option>
                        <option value="LP">LP</option>
                        <option value="YPP">YPP</option>
                        <option value="ADC">ADC</option>
                        <option value="SDP">SDP</option>
                        <option value="APGA">APGA</option>
                        <option value="APC">APC</option>
                        <option value="PDP">PDP</option>
                    </select>
                </div>
                
                <div>
                    <p className="pb-2 text-sm text-gray-600 font-semibold">Phone</p>
                    <input type="text" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} required className="px-2 py-3 outline-none border rounded-md w-full"/>
                </div>
                <div className="col-span-2">
                    <p className="pb-2 text-sm text-gray-600 font-semibold">Password</p>
                    <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required className="px-2 py-3 outline-none border rounded-md w-full"/>
                </div>
            </div>
            <div className="flex justify-center mt-6">
                <button type="submit" className="w-full bg-yellow-500 text-white py-2 font-semibold rounded-md">
                    {loading ? "Loading..." : "Register as Candidate"}
                </button>
            </div>
        </form>
      </div>

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

export default NewCandidate;
