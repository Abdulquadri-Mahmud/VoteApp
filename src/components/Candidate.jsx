import React, { useEffect, useState } from "react";
import { FiMoreVertical } from "react-icons/fi";
import { Link, Outlet } from "react-router-dom";

function Candidates() {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(null);

  useEffect(() => {
    const fetchCandidates = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "https://vote-app-api.vercel.app/api/candidate/auth/all_candidates"
        );
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

    fetchCandidates();
  }, []);

  return (
    <div className="py-10 px-4">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-semibold text-gray-600">All Candidates</h2>
        <Link to={"all-candidate"} className="text-gray-600 underline">
          See more
        </Link>
      </div>

      {/* Responsive table container */}
      <div className="overflow-x-auto">
        <table className="w-full bg-white shadow-md rounded-lg min-w-[700px]">
          <thead>
            <tr className="bg-gradient-to-r from-blue-800 to-yellow-700 text-white">
              <th className="py-3 px-6 text-left">Image</th>
              <th className="py-3 px-6 text-left">Full Name</th>
              <th className="py-3 px-6 text-left">Gender</th>
              <th className="py-3 px-6 text-left">Party</th>
              <th className="py-3 px-6 text-left">State</th>
              <th className="py-3 px-6 text-left">Vote Count</th>
              <th className="py-3 px-6 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              [...Array(5)].map((_, index) => (
                <tr key={index} className="border-b animate-pulse">
                  <td className="py-3 px-6">
                    <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
                  </td>
                  <td className="py-3 px-6">
                    <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                  </td>
                  <td className="py-3 px-6">
                    <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                  </td>
                  <td className="py-3 px-6">
                    <div className="h-4 bg-gray-300 rounded w-1/3"></div>
                  </td>
                  <td className="py-3 px-6">
                    <div className="h-4 bg-gray-300 rounded w-2/3"></div>
                  </td>
                  <td className="py-3 px-6">
                    <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                  </td>
                  <td className="py-3 px-6">
                    <div className="h-4 bg-gray-300 rounded w-1/5"></div>
                  </td>
                </tr>
              ))
            ) : candidates.length > 0 ? (
              candidates.map((candidate, index) => (
                <tr key={candidate.id} className="border-b hover:bg-gray-100 relative">
                  <td className="py-3 px-6">
                    <img
                      src={candidate.image || "https://via.placeholder.com/50"}
                      alt={candidate.fullname}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  </td>
                  <td className="py-3 px-6">{candidate.fullname}</td>
                  <td className="py-3 px-6">{candidate.gender}</td>
                  <td className="py-3 px-6">{candidate.party}</td>
                  <td className="py-3 px-6">{candidate.state}</td>
                  <td className="py-3 px-6 font-bold">{candidate.voteCount || 0}</td>
                  <td className="py-3 px-6 relative">
                    <button
                      onClick={() => setDropdownOpen(dropdownOpen === index ? null : index)}
                      className="focus:outline-none"
                    >
                      <FiMoreVertical className="text-lg cursor-pointer" />
                    </button>
                    {dropdownOpen === index && (
                      <div className="absolute right-0 mt-2 w-40 bg-white shadow-md rounded-md z-10">
                        <button
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 w-full text-left"
                          aria-label={`View details for ${candidate.name}`}
                        >
                          <Link to={`all-candidate/update-candidate/${candidate._id}`} title={`View details of ${candidate.fullname}`}>
                            View Details
                          </Link>
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="py-4 text-center text-gray-500">
                  No candidates available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Outlet />
    </div>
  );
}

export default Candidates;