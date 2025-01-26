import React, { useState } from "react";
import { IoAddCircleOutline } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import VotingPanel from "./voteSection/VoteSection";
import { useDispatch, useSelector } from "react-redux";
import { updateFailure, updateStart, updateSuccess } from "../../store/user/userReducer";

const Profile = () => {
  const { currentUser, loading } = useSelector((state) => (state.user));

  const [activeTab, setActiveTab] = useState("Personal Info");

  const [elections, setElections] = useState([
    { name: "UP state election", date: "02-04-2022" },
    { name: "Manipur state Election", date: "04-04-2022" },
    { name: "Chhattisgarh state Election", date: "12-04-2022" },
    { name: "Bangalore state Election", date: "20-04-2022" },
    { name: "Gurgaon Municipal Corporation", date: "26-04-2022" },
  ]);
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    votersCardNumber: '',
    password: ''
  });
  
  const [newElection, setNewElection] = useState({ name: "", date: "" });
  const [showModal, setShowModal] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const [showFacialRecognitionModal, setShowFacialRecognitionModal] = useState(false);
  const [hasProceeded, setHasProceeded] = useState(false); // Track if user clicked 'Proceed'

  let party;

  if ("party" in currentUser) {
    party = currentUser.party
  }
  
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  };

  console.log(formData);
  

  let dispatch = useDispatch();

  const { id } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
          dispatch(updateStart());
          const endpoint = `https://vote-app-api.vercel.app/api/candidate-voter/auth/update_candidate/${id}`;
    
          const res = await fetch(endpoint, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
          });
    
          const data = await res.json();
    
          if (data.success === false) {
            dispatch(updateFailure(data.message));
            setModalContent({ show: true, title: "Error", message: data.message });
            return;
          }
    
          dispatch(updateSuccess(data));
          setModalContent({ show: true, title: "Success", message: "You have successfully logged in!" });
          setTimeout(() => navigate('/profile'), 1500);
    
        } catch (error) {
          dispatch(updateFailure(error.message));
          setModalContent({ show: true, title: "Error", message: "An error occurred during login. Please try again." });
        }
  };

  const handleAddElection = () => {
    if (newElection.name && newElection.date) {
      setElections([...elections, newElection]);
      setNewElection({ name: "", date: "" });
      setShowModal(false);
    }
  };

  let navigate = useNavigate();

  const handleProceed = () => {
    setHasProceeded(true); // Mark that the user has proceeded
    setShowInstructions(false); // Close the instructions modal
  };

  const renderInstructionsModal = () => {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white rounded-lg p-6 w-11/12 max-w-2xl shadow-lg">
          <h3 className="text-lg font-semibold mb-4">
            This election is being conducted by the election commission of Nigeria.
          </h3>
          <p className="text-sm mb-4">
            You, as being a member of the constituency under the constituencies
            of Nigeria State Election, are allowed to vote. Please take
            the following steps in order to cast a valid vote:
          </p>
          <ul className="list-disc pl-5 mb-4 text-sm text-gray-700">
            <li>Stay in the frame of your camera alone with sufficient lighting.</li>
            <li>You are allowed to make only one vote per election.</li>
            <li>You can choose only one candidate per election.</li>
            <li>Candidates information are available on the page.</li>
            <li>Confirm the candidate's name and symbol on the screen.</li>
            <li>Submit the vote after selecting the candidate.</li>
            <li>Results will be announced after 5 days of the election.</li>
            <li>You can verify your vote after the election results are announced.</li>
          </ul>
          <div className="flex items-center mb-4">
            <input type="checkbox" id="agree" className="mr-2" onChange={(e) => setCheckboxChecked(e.target.checked)} />
            <label htmlFor="agree" className="text-sm">
              I understand and will follow the above steps.
            </label>
          </div>
          <div className="flex justify-end space-x-2">
            <button className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg" onClick={() => setShowInstructions(false)}>
              Cancel
            </button>
            <button className={`px-4 py-2 rounded-lg ${
                checkboxChecked
                  ? "bg-blue-600 text-white"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
              disabled={!checkboxChecked}
              onClick={handleProceed}
            >
              Proceed
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    switch (activeTab) {
      case "Personal Info":
        return (
          <div className="text-gray-800">
            <form className='mt-6' onSubmit={handleSubmit}>
              <div className='mb-3'>
                <p className='text-gray-600 font-medium pb-2'>Full Name:</p>
                  <input onChange={handleChange} id='fullname' type="text" className='p-3 border-2 border-gray-200 placeholder:text-sm outline-none w-full rounded-md text-sm' defaultValue={currentUser.fullname}/>
              </div>
              <div className='mb-3'>
                  <p className='text-gray-600 font-medium pb-2'>Email:</p>
                  <input onChange={handleChange} id='email' type="email" className='p-3 border-2 border-gray-200 placeholder:text-sm outline-none w-full rounded-md text-sm' defaultValue={currentUser.email}/>
              </div>
              {
                "party" in currentUser ? (
                  <>
                    <div className="pb-2">
                      <p className={`pb-2 font-semibold`}>Party</p>
                      <input type="text" value={party} className="px-2 py-3 outline-none border rounded-md w-full group-disabled:"/>
                    </div>
                    <div className="pb-2">
                      <p className={`pb-2 font-semibold`}>Phone</p>
                      <input type="text" name="phone" placeholder="Phone" value={currentUser.phone} onChange={handleChange} className="px-2 py-3 outline-none border rounded-md w-full"/>
                    </div>
                  </>
                ) : (
                  <>
                    <div className='mb-3'>
                        <p className='text-gray-600 font-medium pb-2'>voters Card Number:</p>
                        <input onChange={handleChange} id='votersCardNumber' type="text" className='p-3 border-2 border-gray-200 placeholder:text-sm outline-none w-full rounded-md text-sm' defaultValue={currentUser.votersCardNumber}/>
                    </div>
                  </>
                )
              }
              {/* <div className='mb-3'>
                  <p className='text-gray-600 font-medium pb-2'>Address:</p>
                  <input onChange={handleChange} id='address' type="text" className='p-3 border-2 border-gray-200 placeholder:text-sm outline-none w-full rounded-md text-sm' defaultValue={voters.password}/>
              </div> */}
              <div className='mb-3'>
                  <p className='text-gray-600 font-medium pb-2'>Password:</p>
                  <input onChange={handleChange} id='password' type="password" className='p-3 border-2 border-gray-200 placeholder:text-sm outline-none w-full rounded-md text-sm'/>
              </div>
              <div>
                {/* {
                  updateError && (
                    <>
                      <Alert status='error' rounded={'8px'}>
                          <AlertIcon />
                          <AlertDescription>{updateError}</AlertDescription>
                      </Alert>
                    </>
                  )
                } */}
              </div>
              <div className='flex justify-center mt-3' my={3}>
                  <button type='submit' className='lg:w-[200px] w-full py-2 bg-yellow-500 text-white uppercase font-medium rounded-md'>
                    {
                      loading ? 'Loading...' : 'Save Changes'
                    }
                  </button>
              </div>
            </form>
          </div>
        )
      case "Elections":
        return (
          <div className="text-gray-800">
            <h2 className="text-xl font-bold mb-4">Elections</h2>
            <div>
              <h3 className="font-semibold mb-2">Upcoming Elections:</h3>
              <div className="mb-4">
                {elections.slice(0, 1).map((election, index) => (
                  <div
                    key={index}
                    className="bg-gray-200 p-3 rounded-lg flex justify-between items-center mb-2"
                  >
                    <span>{election.name}</span>
                    <span>{election.date}</span>
                  </div>
                ))}
              </div>
              <h3 className="font-semibold mb-2">Other Elections:</h3>
              <div>
                {elections.slice(1).map((election, index) => (
                  <div
                    key={index}
                    className="bg-gray-200 p-3 rounded-lg flex justify-between items-center mb-2"
                  >
                    <span>{election.name}</span>
                    <span>{election.date}</span>
                  </div>
                ))}
              </div>
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="mt-4 flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg"
            >
              <IoAddCircleOutline className="mr-2" />
              Add New Election
            </button>
          </div>
        );
      case "Vote":
        return (
          <div className="text-gray-800">
            <h2 className={`${hasProceeded ? 'text-center text-xl font-bold mb-2' : 'text-xl font-bold mb-4'}`}>Vote Section</h2>
            <p className={`${hasProceeded ? 'text-center' : 'text-sm font-normal mb-4'}`}>Cast your vote securely in this section.</p>
            {!hasProceeded && (
              <button onClick={() => setShowInstructions(true)} className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg">
                Vote Now
              </button>
            )}
            {hasProceeded && <VotingPanel />}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen py-10 px-2 bg-gradient-to-b from-blue-900 to-blue-400">
      <div className="bg-white mx-3  text-gray-800 max-w-full lg:max-w-5xl md:mx-auto rounded-lg overflow-hidden shadow-lg">
        <div className="flex justify-between items-center bg-blue-700 px-6 py-4">
          <div className="flex space-x-6">
            {["Personal Info", "Elections", "Vote"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`text-gray-800 font-semibold px-4 py-2 rounded-md transition duration-300 ${
                  activeTab === tab ? "bg-blue-600 text-white w-[150px]" : "hover:bg-blue-600 text-white"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
        <div className="p-6 transition-opacity duration-300">{renderContent()}</div>
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Add New Election</h3>
            <input
              type="text"
              placeholder="Election Name"
              value={newElection.name}
              onChange={(e) => setNewElection({ ...newElection, name: e.target.value })}
              className="w-full mb-4 p-2 border rounded-lg"
            />
            <input
              type="date"
              value={newElection.date}
              onChange={(e) => setNewElection({ ...newElection, date: e.target.value })}
              className="w-full mb-4 p-2 border rounded-lg"
            />
            <div className="flex justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleAddElection}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg ml-2"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
      {showInstructions && renderInstructionsModal()}
    </div>
  );
};

export default Profile;
