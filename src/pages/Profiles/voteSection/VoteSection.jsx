import React, { useState, useRef, useEffect } from "react";

const VotingPanel = () => {
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorModal, setErrorModal] = useState({ isOpen: false, message: "" });
  // const [successModal, setSuccessModal] = useState({ isOpen: false, message: "" });
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const [imageCaptured, setImageCaptured] = useState(false); // Track if an image has been captured

  const videoRef = useRef();
  const canvasRef = useRef();

  const candidates = [
    { name: "Aderonle Fawole", party: "PDP", symbol: "https://upload.wikimedia.org/wikipedia/en/6/62/Logo_of_the_Peoples_Democratic_Party_%28Nigeria%29.png" },
    { name: "Ngozi Chidioke", party: "APC", symbol: "https://e7.pngegg.com/pngimages/104/910/png-clipart-apc-logo-round-icons-logos-emojis-iconic-brands.png" },
    { name: "Abdul Salam Abdul Qoyum", party: "APGA", symbol: "https://upload.wikimedia.org/wikipedia/en/b/b3/APGA_Nigeria_Logo.png" },
    { name: "Abdul-Quadri Nurussalam", party: "NNPP", symbol: "https://cdn.vanguardngr.com/wp-content/uploads/2022/03/NNPP.jpg" },
  ];

  // Load FaceAPI models
  useEffect(() => {
    const loadModels = async () => {
      try {
        const MODEL_URL = `${window.location.origin}/models`; // Adjusted to browser environment
        // console.log("Models loaded successfully");
      } catch (error) {
        console.error("Error loading models:", error);
        setErrorModal({
          isOpen: true,
          message: "Failed to load face detection models. Please try again.",
        });
      }
    };
    loadModels();

    return () => {
      // Cleanup camera stream when component unmounts
      const stream = videoRef.current?.srcObject;
      if (stream) {
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
      }
    };
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

    const formData = {
      candidate: selectedCandidate,
      userImage: image,
    };

    console.log("Form Data:", formData);
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

  return (
    <div className="">
      {/* <h1 className="text-2xl font-bold mb-4 text-center">Voting Panel</h1> */}

      <div className="flex gap-5 flex-wrap justify-around">
        {/* Candidate Selection */}
        <div className="flex-1">
          {candidates.map((candidate, index) => (
            <label key={index} className={`flex items-center justify-between p-2 my-4 rounded-lg border ${
                selectedCandidate === candidate.name
                  ? "border-blue-500 text-gray-800 bg-gray-100"
                  : "border-gray-300"
              }`}>
              <input type="radio" name="candidate" value={candidate.name} className="mr-2" onChange={() => setSelectedCandidate(candidate.name)}/>
              <div className="flex-1">
                <p className="font-semibold">{candidate.name}</p>
                <p className="text-sm text-blue-500 font-semibold">{candidate.party}</p>
              </div>
              <img src={candidate.symbol} alt={candidate.party} className="w-8 h-8 rounded-full"/>
            </label>
          ))}
          
          {/* Modal for Camera */}
          <div className="mb-4 mt-5">
            <button onClick={() => {
                setIsModalOpen(true);
                startCamera();
              }} className="bg-blue-500 text-white py-2 px-4 rounded-lg"
              disabled={imageCaptured} // Disable if image is already captured
            >
              Open Camera
            </button>
          </div>
        </div>

        {/* Captured Image and Candidate Selection Side by Side */}
        <div className="flex items-center md:w-[300px] h-[300px] p-3 lg:mt-4 border border-gray-300 rounded-lg w-full space-x-4">
          {previewImage && (
            <div className="flex-1">
              {/* <h2 className="font-semibold mb-2">Captured Image:</h2> */}
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
            {/* <h2 className="text-xl font-semibold mb-4">Submission Success</h2> */}
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
        <input type="checkbox" id="confirmation" className="mr-2" checked={isCheckboxChecked} onChange={() => setIsCheckboxChecked(!isCheckboxChecked)}/>
        <label htmlFor="confirmation">
          I confirm my selection of {selectedCandidate || "a candidate"}.
        </label>
      </div>

      {selectedCandidate && (
        <div className="flex items-center gap-2">
          <h2 className="font-semibold text-[17px] mb-2">Selected Candidate:</h2>
          <p className="font-">{selectedCandidate}</p>
          <p className="text-sm">{candidates.find((c) => c.name === selectedCandidate)?.party}</p>
        </div>
      )}

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white py-2 px-6 font-semibold rounded-lg w-full"
      >
        Submit
      </button>
    </div>
  );
};

export default VotingPanel;
