import React, { useEffect, useState } from "react";
import { FiMoreVertical } from "react-icons/fi";
import { Link, Outlet } from "react-router-dom";

function AllCandidates() {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [candidateToDelete, setCandidateToDelete] = useState(null);
  const candidatesPerPage = 5;

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

  const handleDelete = async () => {
    if (!candidateToDelete) return;

    try {
      const response = await fetch(`https://vote-app-api.vercel.app/api/candidate/auth/delete_candidate/${candidateToDelete}`,
        { method: "DELETE" }
      );

      if (!response.ok) {
        throw new Error("Failed to delete candidate. Please try again.");
      }

      setCandidates(prevCandidates => prevCandidates.filter(c => c._id !== candidateToDelete));
      setShowModal(false);
    } catch (error) {
      console.error("Error deleting candidate:", error);
    }
  };

  const confirmDelete = (candidateId) => {
    setCandidateToDelete(candidateId);
    setShowModal(true);
  };

  const totalPages = Math.ceil(candidates.length / candidatesPerPage);
  const paginatedCandidates = candidates.slice((currentPage - 1) * candidatesPerPage, currentPage * candidatesPerPage);

  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className="py-10 px-4">
      <h2 className="text-2xl font-bold text-center mb-6">All Candidates</h2>
      <table className="w-full bg-white rounded-lg">
        <thead>
          <tr className="bg-gradient-to-r from-blue-800 to-yellow-700 text-white">
            <th className="py-3 px-6 text-left rounded-tl-md">Image</th>
            <th className="py-3 px-6 text-left">Full Name</th>
            <th className="py-3 px-6 text-left">Gender</th>
            <th className="py-3 px-6 text-left">Party</th>
            <th className="py-3 px-6 text-left">State</th>
            <th className="py-3 px-6 text-left">Vote Count</th>
            <th className="py-3 px-6 text-left rounded-tr-md">Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedCandidates.map((candidate, index) => (
            <tr key={candidate._id} className="border-b hover:bg-gray-100 relative">
              <td className="py-3 px-6">
                <img src={candidate.image || "https://via.placeholder.com/50"} alt={candidate.fullname} className="w-12 h-12 rounded-full object-cover" />
              </td>
              <td className="py-3 px-6">{candidate.fullname}</td>
              <td className="py-3 px-6">{candidate.gender}</td>
              <td className="py-3 px-6">{candidate.party}</td>
              <td className="py-3 px-6">{candidate.state}</td>
              <td className="py-3 px-6 font-bold">{candidate.voteCount || 0}</td>
              <td className="py-3 px-6 relative">
                <button onClick={() => setDropdownOpen(dropdownOpen === index ? null : index)} className="focus:outline-none">
                  <FiMoreVertical className="text-lg cursor-pointer" />
                </button>
                {dropdownOpen === index && (
                  <div className="absolute right-0 mt-2 w-40 bg-white shadow-md rounded-md z-10">
                    <Link to={`update-candidate/${candidate._id}`} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200">
                      View Details
                    </Link>
                    <button onClick={() => confirmDelete(candidate._id)} className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-100">
                      Delete
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-lg font-bold mb-4">Confirm Delete</h3>
            <p>Are you sure you want to delete this candidate?</p>
            <div className="flex justify-end mt-4">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 mr-2 bg-gray-400 text-white rounded-md">Cancel</button>
              <button onClick={handleDelete} className="px-4 py-2 bg-red-600 text-white rounded-md">Delete</button>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-center flex-wrap bg-white w-[300px] rounded-b-lg mx-auto py-4">
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="px-4 py-2 bg-blue-600 text-white rounded-md disabled:opacity-50 mx-2">Previous</button>
        {[...Array(totalPages)].map((_, index) => (
          <button key={index + 1} onClick={() => handlePageChange(index + 1)} className={`px-4 py-2 mx-1 rounded-md ${currentPage === index + 1 ? "bg-gradient-to-b from-blue-800 to-yellow-700 text-white font-bold" : "bg-yellow-200 text-black"}`}>
            {index + 1}
          </button>
        ))}
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className="px-4 py-2 bg-blue-600 text-white rounded-md disabled:opacity-50 mx-2">Next</button>
      </div>

      <Outlet />
    </div>
  );
}

export default AllCandidates;
