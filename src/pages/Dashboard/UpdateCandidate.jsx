import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom"; // useParams to get the id from the URL
import { MdOutlineCloudUpload } from "react-icons/md";

function UpdateCandidate() {
  const { id } = useParams(); // Get candidate id from URL params

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    party: "",
    phone: "",
    gender: "",
    state: "",
    image: "",
  });

  const [showModal, setShowModal] = useState(false); // To toggle modal visibility
  const [modalMessage, setModalMessage] = useState(""); // Modal message for success/error
  const [imageUploading, setImageUploading] = useState(false); // Track image upload status
  const [loading, setLoading] = useState(false); // Loading state for form submission
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Fetch candidate data by id when the component mounts
  useEffect(() => {
    const fetchCandidateData = async () => {
      try {
        const res = await fetch(`https://vote-app-api.vercel.app/api/candidate/auth/single_candidate/${id}`);
        const data = await res.json();
        
        setFormData(data);
      } catch (error) {
        console.error("Error fetching candidate data:", error);
        setModalMessage("An error occurred while fetching candidate data.");
        setShowModal(true);
      }
    };

    fetchCandidateData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpload = async (e) => {
    setImageUploading(true); // Set image upload to true when starting upload

    window.cloudinary.openUploadWidget(
      {
        cloudName: "dypn7gna0",
        uploadPreset: "magkk_football_talk",
        sources: ["local", "url", "camera"],
        multiple: false, // Allow multiple uploads false
      },
      (error, result) => {
        setImageUploading(false); // Reset image uploading status after upload completes

        if (!error && result && result.event === "success") {
          const uploadedUrl = result.info.secure_url; // Get the secure URL for the uploaded file

          // Update the formData.image field with the uploaded image URL
          setFormData((prevFormData) => ({
            ...prevFormData,
            image: uploadedUrl,
          }));
        } else if (error) {
          console.error("Upload Error:", error);
          alert("An error occurred during upload.");
        }
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading state to true when starting form submission

    try {
      const res = await fetch(`https://vote-app-api.vercel.app/api/candidate/auth/update_candidate/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      
      if (data.success === false) {
          setModalMessage(data.message);
          setShowModal(true);
          setLoading(false); // Reset loading state after submission
        return;
      }

      setModalMessage("Updated successfully!");
      setShowModal(true);
      setLoading(false);

    } catch (err) {
      setLoading(false); // Reset loading state on error
      setModalMessage("An error occurred during registration. Please try again.");
      setShowModal(true);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const nigerianStates = [
    "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue", "Borno", 
    "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", "Gombe", "Imo", "Jigawa", 
    "Kaduna", "Kano", "Katsina", "Kebbi", "Kogi", "Kwara", "Lagos", "Nasarawa", "Niger", 
    "Ogun", "Ondo", "Osun", "Oyo", "Plateau", "Rivers", "Sokoto", "Taraba", "Yobe", "Zamfara"
  ];

  const handleGoBack = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <div className="md:py-14 py-10 bg-gradient-to-b px-2 ">
      <div className="max-w-3xl mx-auto p-4 bg-white shadow-md rounded-lg">
        <form onSubmit={handleSubmit}>
          <div className="flex justify-center">
            <div className="mb-7 w-[200px] rounded-md p-3 bg-gray-200">
              <div className="flex justify-center">
                <div className="w-[100px] h-[100px] rounded-full border flex justify-center items-center border-blue-500">
                  <img src={`${formData.image}`} alt="" className={`max-w-[100px] max-h-[100px] rounded-full object-fill`} />
                </div>
              </div>
              <button onClick={handleUpload} type="button" className="w-[100%] flex justify-center rounded-md mt-3 mx-auto bg-gradient-to-r from-blue-800 to-yellow-500 p-2">
                <MdOutlineCloudUpload className="text-3xl text-white" />
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 grid-cols-1 gap-3">
            <div>
              <p className="pb-2 text-sm text-gray-600 font-semibold">Full name</p>
              <input type="text" name="fullname" placeholder="Full Name" value={formData.fullname} onChange={handleChange} className="px-2 py-3 outline-none border rounded-md w-full" />
            </div>
            <div>
              <p className="pb-2 text-sm text-gray-600 font-semibold">Email</p>
              <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="px-2 py-3 outline-none border rounded-md w-full" />
            </div>
            <div>
              <p className="pb-2 text-sm text-gray-600 font-semibold">Party</p>
              <select name="party" value={formData.party} onChange={handleChange} className="px-2 py-3 outline-none border rounded-md w-full">
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
              <input type="text" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} className="px-2 py-3 outline-none border rounded-md w-full" />
            </div>

            <div className="">
              <p className="pb-2 text-sm text-gray-600 font-semibold">Gender</p>
              <select name="gender" value={formData.gender} onChange={handleChange} className="px-2 py-3 outline-none border rounded-md w-full">
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="">
              <p className="pb-2 text-sm text-gray-600 font-semibold">State</p>
              <select name="state" value={formData.state} onChange={handleChange} className="px-2 py-3 outline-none border rounded-md w-full">
                <option value="">Select State</option>
                {nigerianStates.map((state) => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex justify-center mt-6">
            <button type="submit" className="w-full bg-gradient-to-r from-blue-800 to-yellow-500 text-white py-2 font-semibold rounded-md">
              {loading ? "Loading..." : "Register as Candidate"}
            </button>
          </div>
        </form>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white w-[350px] p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-center mb-4 text-blue-700">Registration</h2>
            <p className="text-center text-lg mb-4 font-semibold">{modalMessage}</p>
            <div className="flex justify-between items-center mt-7">
                <button onClick={closeModal} className="bg-red-500 text-white py-2 px-6 shadow-md rounded-md">
                Close
                </button>
                <button onClick={handleGoBack} className="bg-gradient-to-r from-blue-800 to-yellow-500 text-gray-50 px-3 py-2 rounded-lg shadow-lg hover:bg-gray-400 transition duration-300 transform hover:scale-105" >
                Go Back
                </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UpdateCandidate;