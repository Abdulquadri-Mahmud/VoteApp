import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import Webcam from "react-webcam";

const VotingPanel = () => {
  const { id } = useParams();

  console.log(id);
  
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [image, setImage] = useState(null);
  const [errorModal, setErrorModal] = useState({ isOpen: false, message: "" });
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const [imageCaptured, setImageCaptured] = useState(false);
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [vote, setVote] = useState(null);
  const [hasVoted, setHasVoted] = useState(false);

  // Fetch candidates data from API
  useEffect(() => {
    fetchCandidates();
  }, []);

  const fetchCandidates = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://vote-app-api.vercel.app/api/candidate/auth/all_candidates");
      const data = await response.json();

      if (Array.isArray(data)) {
        setCandidates(data);
      } else {
        console.error("Invalid data format:", data);
      }
    } catch (error) {
      console.error("Error fetching candidates:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const storedVote = localStorage.getItem("vote");
    if (storedVote) {
      setHasVoted(true);
      setVote(JSON.parse(storedVote));
    }
  }, []);

  // Camera functionalities
  const webRef = useRef(null);
  const [isCameraOn, setIsCameraOn] = useState(false);

  const videoConstraints = {
    width: 250,
    height: 200,
    facingMode: "user",
  };

  const startCamera = () => {
    setIsCameraOn(true);
  };

  const stopCamera = () => {
    setIsCameraOn(false);
  };

  const captureImage = () => {
    if (webRef.current) {
      setImage(webRef.current.getScreenshot());
      setImageCaptured(true);
      setIsCameraOn(false); // Turn off the camera after capturing the image
    }
  };

  const handleDelete = () => {
    setImage(null);
    setImageCaptured(false);
  };

  const handleSubmit = () => {
    if (!selectedCandidate && image) {
      setErrorModal({
        isOpen: true,
        message: "Please select a candidate",
      });
      return;
    }
    if (selectedCandidate && !image) {
      setErrorModal({
        isOpen: true,
        message: "Please capture an image!",
      });
      return;
    }

    if (!selectedCandidate && !image) {
      setErrorModal({
        isOpen: true,
        message: "Please select a candidate and capture an image!",
      });
      return;
    }

    // Check if the checkbox is clicked
    if (!isCheckboxChecked) {
      setErrorModal({
        isOpen: true,
        message: "Please confirm your selection by checking the checkbox!",
      });
      return;
    }

    // Find the selected candidate's full details
    const candidateData = candidates.find((c) => c.fullname === selectedCandidate);

    if (candidateData) {
      // Store candidate info and image in localStorage
      const formData = {
        candidate: candidateData, // store entire candidate object
        userImage: image,         // store captured image
      };

      // Save vote to localStorage
      localStorage.setItem("vote", JSON.stringify(formData));

      // Set vote state and mark the user as having voted
      setVote(formData);
      setHasVoted(true);

      setErrorModal({
        isOpen: true,
        message: "Your vote has been successfully recorded. Thank you for participating in the election!",
      });
    } else {
      setErrorModal({
        isOpen: true,
        message: "Candidate not found!",
      });
    }
  };

  const deleteImage = () => {
    setImage(null);
    setImageCaptured(false);
  };

  if (hasVoted) {
    return (
      <div className="text-center">
        <h2 className="font-semibold text-lg">You have already voted!</h2>
        <p>Your vote has been recorded for: {vote.candidate.fullname || vote.candidate} from the ({vote.candidate.party || vote.candidate}) party</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex gap-5 flex-wrap justify-around">
        <div className="flex-1">
          {candidates.map((candidate, index) => (
            <label
              key={index}
              className={`flex items-center justify-between p-2 my-4 rounded-lg border ${
                selectedCandidate === candidate.fullname
                  ? "border-blue-500 text-gray-800 bg-gray-100"
                  : "border-gray-300"
              }`}
            >
              <input type="radio" name="candidate" value={candidate.fullname} className="mr-2" onChange={() => setSelectedCandidate(candidate.fullname)} disabled={hasVoted}/>
              <div className="flex-1">
                <p className="font-semibold">{candidate.fullname}</p>
                <p className="text-sm text-blue-500 font-semibold">{candidate.party}</p>
                <p className="text-sm" style={{ display: "none" }}>{candidate.gender}</p>
                <p className="text-sm" style={{ display: "none" }}>{candidate.state}</p>
              </div>
              <img
                src={candidate.image}
                alt={candidate.party}
                className="w-8 h-8 rounded-full"
              />
            </label>
          ))}

          <div className="mb-4 mt-5">
            <button
              onClick={startCamera}
              disabled={imageCaptured || hasVoted}
              className="bg-blue-500 text-white py-2 px-4 rounded-lg"
            >
              {isCameraOn ? "Turn off Camera" : "Turn on Camera"}
            </button>
          </div>
        </div>

        <div className="flex items-center md:w-[300px] p-3 lg:mt-4 border border-gray-300 rounded-lg w-full space-x-4">
          <div className="flex-1">
            <div className="fle justify-cente">
              {
                isCameraOn ? (
                    <>
                        <Webcam ref={webRef} videoConstraints={videoConstraints} audio={false}/>
                        <div className="flex justify-center mt-4">
                          <button onClick={captureImage} className="bg-green-500 text-white py-2 px-4 rounded-lg mr-2"disabled={imageCaptured}>
                            Capture
                          </button>
                          <button onClick={stopCamera} className="bg-red-500 text-white py-2 px-4 rounded-lg">
                            Stop Camera
                          </button>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="flex justify-center">
                          {
                            image && (
                              <>
                                <img src={image} alt="Captured" className="rounded-md mb-2 max-w-full" />
                                <div className="flex justify-center">
                                  <button onClick={deleteImage} className="bg-red-500 text-white py-2 px-4 rounded-lg">
                                    Delete Image
                                  </button>
                                </div>
                              </>
                            )
                          }
                        </div>
                    </>
                )
              }
            </div>
          </div>
        </div>
      </div>

      {errorModal.isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center">
          <div className="bg-white relative h-[250px] text-white p-8 rounded-lg shadow-xl max-w-md w-full">
            <p className="text-lg text-red-600 font-semibold">{errorModal.message}</p>
            <div className="flex justify-end mt-6 absolute bottom-5 right-5">
              <button onClick={() => setErrorModal({ isOpen: false, message: "" })}
                className="bg-yellow-500 text-white py-2 px-6 rounded-lg">
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center my-4">
        <input type="checkbox" id="confirmation" className="mr-2" checked={isCheckboxChecked}
          onChange={() => setIsCheckboxChecked(!isCheckboxChecked)}
          disabled={hasVoted}/>
        <label htmlFor="confirmation">
          I confirm my selection of {selectedCandidate || "a candidate"}.
        </label>
      </div>

      {selectedCandidate && (
        <div className="flex items-center gap-2">
          <h2 className="font-semibold text-[17px] mb-2">Selected Candidate:</h2>
          <p>{selectedCandidate}</p>
          <p className="text-sm">
            {candidates.find((c) => c.fullname === selectedCandidate)?.party}
          </p>
        </div>
      )}

      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white py-2 px-6 font-semibold rounded-lg w-full"
        disabled={hasVoted}
      >
        Submit
      </button>
    </div>
  );
};

export default VotingPanel;
