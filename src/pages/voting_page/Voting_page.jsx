import React, { useState } from "react";

const VotingPage = () => {
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [voteSuccess, setVoteSuccess] = useState(false);

  const candidates = [
    { id: 1, name: "Candidate A" },
    { id: 2, name: "Candidate B" },
    { id: 3, name: "Candidate C" },
  ];

  const submitVote = () => {
    if (selectedCandidate) {
      setVoteSuccess(true);
      // Secure vote submission logic (e.g., API call)
    }
  };

  return (
    <div>
      <h2 className="text-lg mb-4">Select a Candidate</h2>
      <ul className="space-y-2">
        {candidates.map((candidate) => (
          <li
            key={candidate.id}
            className={`cursor-pointer p-4 rounded border ${
              selectedCandidate === candidate.id
                ? "bg-blue-600 text-white"
                : "bg-white"
            }`}
            onClick={() => setSelectedCandidate(candidate.id)}
          >
            {candidate.name}
          </li>
        ))}
      </ul>
      <button
        className={`mt-4 py-2 px-4 rounded ${
          selectedCandidate
            ? "bg-blue-600 text-white"
            : "bg-gray-400 text-gray-700 cursor-not-allowed"
        }`}
        onClick={submitVote}
        disabled={!selectedCandidate}
      >
        Submit Vote
      </button>
      {voteSuccess && <p className="text-green-600 mt-4">Vote submitted!</p>}
    </div>
  );
};

export default VotingPage;
