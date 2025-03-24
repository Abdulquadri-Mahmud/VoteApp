import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from "chart.js";
import ReactPaginate from "react-paginate";
import Candidates from "@/components/Candidate";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const Dashboard = () => {
  const [votes, setVotes] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [states, setStates] = useState([]);

  useEffect(() => {
    const fetchVotes = async () => {
      setLoading(true);
      try {
        const endpoint = "https://vote-app-api.vercel.app/api/votes/candidate/results";
        const response = await fetch(endpoint);
        const data = await response.json();

        if (response.ok) {
          const formattedVotes = {};
          const stateList = new Set();

          data.votes.forEach((result) => {
            const { state, count } = result;
            formattedVotes[state] = count;
            stateList.add(state);
          });
          setVotes(formattedVotes);
          setStates([...stateList]);
        } else {
          console.error("Failed to fetch data:", data.message);
        }
      } catch (error) {
        console.error("Error fetching votes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVotes();
  }, []);

  const totalVotes = Object.values(votes).reduce((acc, voteCount) => acc + voteCount, 0);

  const filteredStates = states.filter((state) =>
    state.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const itemsPerPage = 8;
  const pageCount = Math.ceil(filteredStates.length / itemsPerPage);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const displayStates = filteredStates.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const barChartData = {
    labels: displayStates,
    datasets: [
      {
        label: "Votes by State",
        data: displayStates.map((state) => votes[state] || 0),
        backgroundColor: "#4caf50",
        borderColor: "#388e3c",
        borderWidth: 1,
      },
    ],
  };

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
    <div className="lg:p-6 p-2">
      <h1 className="text-4xl font-bold text-center text-blue-600 mb-4">Vote <span className="text-yellow-500">Dashboard</span></h1>
      <p className="text-sm text-center text-gray-700 mb-8">
        View the live overview of vote counts and party distributions. Use the filters to customize your view.
      </p>

      <div className="flex justify-center mb-6 sticky top-0 mx-auto lg:max-w-3xl max-w-full rounded-md bg-white z-10 p-4 shadow-md">
        <input type="text" placeholder="Search State..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="p-2 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
      </div>

      <div className="my-8 lg:p-4 p-2 bg-white rounded-md">
        <h3 className="text-2xl font-semibold text-center text-gray-800 mb-4">Votes by State</h3>
        <div className="grid lg:gap-6 gap-4 grid-cols-2 lg:grid-cols-4">
          {loading
            ? Array.from({ length: itemsPerPage }).map((_, index) => (
                <Card className="p-6 shadow-lg animate-pulse" key={index}>
                  <CardContent className="text-center">
                    <h4 className="font-semibold">Loading...</h4>
                  </CardContent>
                </Card>
              ))
            : displayStates.map((state) => (
                <Card className="p-6 shadow-lg font-semibold" key={state}>
                  <CardContent className="text-center">
                    <h4 className="font-medium text-gray-400">{state}</h4>
                    <p className="text-4xl pt-2 text-yellow-500 font-bold">{votes[state]}</p>
                  </CardContent>
                </Card>
              ))}
        </div>
      </div>

      <div className="mt-8 bg-white rounded-lg lg:p-8 p-6">
        <h3 className="text-2xl font-semibold text-center mb-4">Vote Distribution</h3>
        <div className="flex flex-col lg:flex-row justify-center items-center gap-8">
          <Bar data={barChartData} className="max-w-[48%] max-h-[450px]" />
          <Pie data={pieChartData} className="max-w-[48%] max-h-[450px]" />
        </div>
      </div>

      <div className="mt-6 flex justify-center bg-white p-2 rounded-md lg:max-w-xl max-w-full mx-auto">
        <ReactPaginate
          previousLabel={"Prev"}
          nextLabel={"Next"}
          breakLabel={"..."}
          pageCount={pageCount}
          onPageChange={handlePageChange}
          containerClassName={"flex items-center flex-wrap lg:gap-3 gap-1"}
          activeClassName={"bg-blue-500 text-white rounded-md"}
          pageClassName={"px-3 py-1 bg-yellow-200 font-semibold rounded-md cursor-pointer hover:bg-blue-500 hover:text-white"}
        />
      </div>

      <Candidates/>
      <div className="mt-8 text-center">
        <h2 className="text-3xl font-bold text-blue-700 mb-4">Total Votes: {totalVotes}</h2>
        <Progress value={(totalVotes / 100000) * 100} max={100} className="h-4 rounded-lg bg-green-500 mx-auto w-96" />
      </div>
    </div>
  );
};

export default Dashboard;
