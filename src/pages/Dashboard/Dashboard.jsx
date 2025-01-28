import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress"; // Assuming ShadCN UI has Progress component
import { Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from "chart.js";
import ReactPaginate from "react-paginate"; // Import react-paginate

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

// List of Nigerian States
const states = [
  "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue", "Borno",
  "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", "Gombe", "Imo", "Jigawa",
  "Kaduna", "Kano", "Katsina", "Kebbi", "Kogi", "Kwara", "Lagos", "Nasarawa", "Niger",
  "Ogun", "Ondo", "Osun", "Oyo", "Plateau", "Rivers", "Sokoto", "Taraba", "Yobe", "Zamfara"
];

const Dashboard = () => {
  const [votes, setVotes] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  // Simulate fetching dummy data for votes
  useEffect(() => {
    const fetchVotes = () => {
      setLoading(true);
      setTimeout(() => {
        const dummyVotes = states.reduce((acc, state) => {
          acc[state] = Math.floor(Math.random() * 5000); // Random dummy data
          return acc;
        }, {});
        setVotes(dummyVotes);
        setLoading(false);
      }, 1000); // Simulate API delay
    };

    fetchVotes();
  }, []);

  const totalVotes = Object.values(votes).reduce((acc, voteCount) => acc + voteCount, 0);

  // Global search: Filter all states by search term
  const filteredStates = states.filter((state) =>
    state.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination
  const itemsPerPage = 6; // Number of items per page
  const pageCount = Math.ceil(filteredStates.length / itemsPerPage); // Total pages

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected); // Update the current page
  };

  // States to display on the current page
  const displayStates = filteredStates.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  // Data for Bar Chart
  const barChartData = {
    labels: displayStates,
    datasets: [
      {
        label: "Votes by State",
        data: displayStates.map((state) => votes[state] || 0),
        backgroundColor: "#4caf50", // Green bars
        borderColor: "#388e3c",
        borderWidth: 1,
      },
    ],
  };

  // Data for Pie Chart
  const pieChartData = {
    labels: displayStates,
    datasets: [
      {
        data: displayStates.map((state) => votes[state] || 0),
        backgroundColor: displayStates.map(
          () => `#${Math.floor(Math.random() * 16777215).toString(16)}`
        ),
      },
    ],
  };

  return (
    <div className="p-6">
      {/* Dashboard Heading */}
      <h1 className="text-4xl font-bold text-center text-blue-600 mb-4">Vote Dashboard</h1>
      <p className="text-sm text-center text-gray-700 mb-8">
        View the live overview of vote counts and party distributions. Use the filters to customize your view.
      </p>

      {/* Search Bar */}
      <div className="flex justify-center mb-6 sticky top-0 mx-auto lg:max-w-3xl max-w-full rounded-md bg-white z-10 p-4 shadow-md">
        <input type="text" placeholder="Search State..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="p-2 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
      </div>

      {/* Filtered State Data */}
      <div className="my-8 p-4 bg-white rounded-md">
        <h3 className="text-2xl font-semibold text-center text-gray-800 mb-4">Votes by State</h3>
        <div className="grid gap-6 grid-cols-2 lg:grid-cols-3">
          {loading
            ? Array.from({ length: itemsPerPage }).map((_, index) => (
                <Card className="p-6 shadow-lg animate-pulse" key={index}>
                  <CardContent className="text-center">
                    <h4 className="font-semibold">Loading...</h4>
                  </CardContent>
                </Card>
              ))
            : displayStates.map((state) => (
                <Card className="p-6 shadow-lg" key={state}>
                  <CardContent className="text-center">
                    <h4 className="font-semibold">{state}</h4>
                    <p className="text-xl">{votes[state]}</p>
                  </CardContent>
                </Card>
              ))}
        </div>
      </div>

      {/* Pagination */}
      <div className="mt-6 flex justify-center bg-white p-2 rounded-md lg:max-w-3xl max-w-full mx-auto">
        <ReactPaginate
          previousLabel={"← Previous"}
          nextLabel={"Next →"}
          breakLabel={"..."}
          pageCount={pageCount}
          onPageChange={handlePageChange}
          containerClassName={"flex items-center gap-3"}
          activeClassName={"bg-blue-500 text-white rounded-md"}
          pageClassName={"px-3 py-1 bg-yellow-200 font-semibold rounded-md cursor-pointer hover:bg-blue-500 hover:text-white"}
          previousClassName={"px-3 py-1 bg-blue-500 text-white rounded-full cursor-pointer hover:bg-blue-500 hover:text-white"}
          nextClassName={"px-3 py-1 bg-blue-500 text-white rounded-full cursor-pointer hover:bg-blue-500 hover:text-white"}
          disabledClassName={"opacity-50 cursor-not-allowed"}
        />
      </div>

      {/* Grid Layout for Bar Chart and Pie Chart */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2 mt-8">
        {/* Bar Chart Card */}
        <Card className="p-6 shadow-lg hover:shadow-xl transform transition-transform duration-300 hover:scale-105">
          <CardContent className="text-center">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Votes per State (Bar Chart)</h3>
            <div className="h-72">
              <Bar data={barChartData} options={{ responsive: true }} />
            </div>
          </CardContent>
        </Card>

        {/* Pie Chart Card */}
        <Card className="p-6 shadow-lg hover:shadow-xl transform transition-transform duration-300 hover:scale-105">
          <CardContent className="text-center">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Vote Distribution (Pie Chart)</h3>
            <div className="h-72">
              <Pie data={pieChartData} options={{ responsive: true }} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Total Votes Summary */}
      <div className="mt-8 text-center">
        <h2 className="text-3xl font-bold text-blue-700 mb-4">Total Votes: {totalVotes}</h2>
        <Progress value={(totalVotes / 100000) * 100} max={100} className="h-4 rounded-lg bg-green-500 mx-auto w-96" />
        <p className="mt-2 text-sm text-gray-600">Progress towards overall vote target</p>
      </div>
    </div>
  );
};

export default Dashboard;