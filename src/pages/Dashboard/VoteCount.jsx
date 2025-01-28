import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress"; // Assuming Progress component from ShadCN UI

// Array of political party names for dynamic rendering
const parties = [
  "NNPP", "LP", "YPP", "ADC", "SDP", "APGA", "APC", "PDP"
];

const VoteCount = () => {
  const [votes, setVotes] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Using dummy data for votes instead of an API call
  useEffect(() => {
    const fetchVotes = () => {
      setLoading(true);
      setTimeout(() => {
        const dummyVotes = {
          NNPP: 10600,
          LP: 15900,
          YPP: 40800,
          ADC: 2000,
          SDP: 35800,
          APGA: 700000,
          APC: 50400,
          PDP: 60900,
        };
        setVotes(dummyVotes); // Set the dummy votes data
        setLoading(false);
      }, 1000); // Simulate a delay for the API call
    };

    fetchVotes();
  }, []);

  // Calculate the total votes
  const totalVotes = Object.values(votes).reduce((acc, voteCount) => acc + voteCount, 0);

  return (
    <div className="p-6">
      {/* Heading and description */}
      <h1 className="text-4xl font-bold text-center text-blue-600 mb-4">Vote Statistics</h1>
      <p className="text-xl text-center text-gray-700 mb-8">
        View the live vote count for each political party. This data reflects the current election standings.
      </p>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Map over the parties array to generate a card for each */}
        {parties.map((party) => {
          const partyVotes = votes[party] ?? 0;
          const votePercentage = totalVotes > 0 ? (partyVotes / totalVotes) * 100 : 0;

          return (
            <Card key={party} className="p-6 hover:shadow-lg transform transition-transform duration-300 hover:scale-105">
              <CardContent className="text-center">
                {/* Party name */}
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">{party}</h3>
                
                {/* Show vote data or loading indicator */}
                {loading ? (
                  <p className="text-xl text-gray-500 animate-pulse">Loading...</p>
                ) : (
                  <>
                    {/* Vote count */}
                    <p className="text-3xl font-bold text-gray-900 my-4">{partyVotes}</p>
                    {/* Progress bar */}
                    <div className="my-4">
                      <Progress
                        value={votePercentage}
                        max={100}
                        className="h-4 rounded-lg bg-blue-100"
                        style={{
                          backgroundImage: `linear-gradient(90deg, #FBBF24 ${votePercentage}%, #3B82F6 ${votePercentage}%)`,
                        }}
                      />
                      <p className="text-sm mt-2">{votePercentage.toFixed(2)}%</p>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default VoteCount;
