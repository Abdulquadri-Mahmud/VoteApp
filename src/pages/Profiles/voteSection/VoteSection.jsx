import React, { useState, useRef, useEffect } from "react";

const VotingPanel = () => {
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorModal, setErrorModal] = useState({ isOpen: false, message: "" });
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const [imageCaptured, setImageCaptured] = useState(false);
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [vote, setVote] = useState(null); // New state to store the vote
  const [hasVoted, setHasVoted] = useState(false); // New state to track if the user has voted

  const videoRef = useRef();
  const canvasRef = useRef();

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

  // Check if the user has already voted when the component mounts
  useEffect(() => {
    const storedVote = localStorage.getItem("vote");
    if (storedVote) {
      setHasVoted(true);
      setVote(JSON.parse(storedVote));
    }
  }, []);

  const startCamera = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
      })
      .catch((err) => console.error("Error accessing camera:", err));
  };

  const captureImage = async () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const context = canvas.getContext("2d");
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    const imageData = canvas.toDataURL("image/png");
    setPreviewImage(imageData);
    setImage(imageData);
    setImageCaptured(true); // Mark image as captured
  };

  const stopCamera = () => {
    const stream = videoRef.current?.srcObject;
    if (stream) {
      const tracks = stream.getTracks();
      tracks.forEach(track => track.stop());
    }
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

    // Find the selected candidate by fullname
    const candidateData = candidates.find((c) => c.fullname === selectedCandidate);

    // Log the selected candidate's full data to the console
    console.log("Selected Candidate Info:", candidateData);

    const formData = {
      candidate: selectedCandidate,
      userImage: image,
    };

    // Save the vote in the state
    setVote({ candidate: selectedCandidate, image });

    // Store the vote in localStorage
    localStorage.setItem("vote", JSON.stringify({ candidate: candidateData}));

    // Log the vote to the console
    // console.log("Vote recorded:", { candidate: selectedCandidate, image });

    setHasVoted(true); // Mark that the user has voted
    setErrorModal({
      isOpen: true,
      message: "Your vote has been successfully recorded. Thank you for participating in the election!",
    });
  };

  const deleteImage = () => {
    setImage(null);
    setPreviewImage(null);
    setImageCaptured(false); // Allow user to capture another image if needed
  };

  if (hasVoted) {
    return (
      <div className="text-center">
        <h2 className="font-semibold text-lg">You have already voted!</h2>
        <p>Your vote has been recorded for: {vote.candidate.fullname || vote.candidate} from the ({vote.candidate.party || vote.candidate}) party</p>
        {/* <button
          onClick={() => {
            localStorage.removeItem("vote");
            setHasVoted(false);
            setVote(null);
          }}
          className="bg-red-500 text-white py-2 px-6 rounded-lg mt-4"
        >
          Reset Vote
        </button> */}
      </div>
    );
  }

  return (
    <div className="">
      <div className="flex gap-5 flex-wrap justify-around">
        {/* Candidate Selection */}
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
              <input
                type="radio"
                name="candidate"
                value={candidate.fullname}
                className="mr-2"
                onChange={() => setSelectedCandidate(candidate.fullname)}
                disabled={hasVoted} // Disable if the user has voted
              />
              <div className="flex-1">
                <p className="font-semibold">{candidate.fullname}</p>
                <p className="text-sm text-blue-500 font-semibold">{candidate.party}</p>
                {/* Hide gender and state on the UI, but log them in the console */}
                <p className="text-sm" style={{ display: "none" }}>
                  {candidate.gender}
                </p>
                <p className="text-sm" style={{ display: "none" }}>
                  {candidate.state}
                </p>
              </div>
              <img
                src={candidate.image} // Make sure to use 'image' if that's the key returned by API
                alt={candidate.party}
                className="w-8 h-8 rounded-full"
              />
            </label>
          ))}

          {/* Modal for Camera */}
          <div className="mb-4 mt-5">
            <button
              onClick={() => {
                setIsModalOpen(true);
                startCamera();
              }}
              className="bg-blue-500 text-white py-2 px-4 rounded-lg"
              disabled={imageCaptured || hasVoted} // Disable if image is already captured or user has voted
            >
              Open Camera
            </button>
          </div>
        </div>

        {/* Captured Image and Candidate Selection Side by Side */}
        <div className="flex items-center md:w-[300px] h-[300px] p-3 lg:mt-4 border border-gray-300 rounded-lg w-full space-x-4">
          {previewImage && (
            <div className="flex-1">
              <img src={previewImage} alt="Captured" className="rounded-md mb-2 w-full " />
              <div className="flex justify-center">
                <button onClick={deleteImage} className="bg-red-500 text-white py-2 px-4 rounded-lg">
                  Delete Image
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center">
          <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-lg font-bold mb-4">Capture Your Image</h2>
            <video ref={videoRef} autoPlay className="rounded-md w-full"></video>
            <canvas ref={canvasRef} className="hidden"></canvas>
            <div className="flex justify-end mt-4">
              <button
                onClick={captureImage}
                className="bg-green-500 text-white py-2 px-4 rounded-lg mr-2"
                disabled={imageCaptured} // Disable if image is already captured
              >
                Capture
              </button>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  stopCamera();
                }}
                className="bg-red-500 text-white py-2 px-4 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Error Modal */}
      {errorModal.isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center">
          <div className="bg-blue-800 text-white p-8 rounded-lg shadow-xl max-w-md w-full">
            <p className="text-lg">{errorModal.message}</p>
            <div className="flex justify-end mt-6">
              <button
                onClick={() => setErrorModal({ isOpen: false, message: "" })}
                className="bg-yellow-500 text-white py-2 px-6 rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Checkbox */}
      <div className="flex items-center my-4">
        <input
          type="checkbox"
          id="confirmation"
          className="mr-2"
          checked={isCheckboxChecked}
          onChange={() => setIsCheckboxChecked(!isCheckboxChecked)}
          disabled={hasVoted} // Disable if the user has voted
        />
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

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white py-2 px-6 font-semibold rounded-lg w-full"
        disabled={hasVoted} // Disable if the user has voted
      >
        Submit
      </button>
    </div>
  );
};

export default VotingPanel;
