import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

// Array of political party names and associated colors
const parties = [
  { name: "NNPP", color: "bg-blue-500" },
  { name: "LP", color: "bg-green-500" },
  { name: "YPP", color: "bg-yellow-500" },
  { name: "ADC", color: "bg-red-500" },
  { name: "SDP", color: "bg-purple-500" },
  { name: "APGA", color: "bg-orange-500" },
  { name: "APC", color: "bg-teal-500" },
  { name: "PDP", color: "bg-indigo-500" },
];

const VoteCount = () => {
  const [votes, setVotes] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVotes = async () => {
      setLoading(true);
      try {
        const endpoint = "https://vote-app-api.vercel.app/api/votes/candidate/results";
        const response = await fetch(endpoint);
        const data = await response.json();

        if (response.ok) {
          const formattedVotes = {};
          data.votes.forEach(({ party, count }) => {
            formattedVotes[party] = count;
          });

          // Ensure all predefined parties are included, even if they have no votes
          parties.forEach(({ name }) => {
            if (!(name in formattedVotes)) {
              formattedVotes[name] = 0;
            }
          });

          setVotes(formattedVotes);
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

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold text-center text-blue-600 mb-4">Vote Statistics</h1>
      <p className="text-xl text-center text-gray-700 mb-8">
        View the live vote count for each political party. This data reflects the current election standings.
      </p>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {parties.map(({ name, color }) => {
          const partyVotes = votes[name] ?? 0;
          const votePercentage = totalVotes > 0 ? (partyVotes / totalVotes) * 100 : 0;

          return (
            <Card key={name} className="p-6 hover:shadow-lg transform transition-transform duration-300 hover:scale-105">
              <CardContent className="text-center">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">{name}</h3>

                {loading ? (
                  <div className="h-6 w-32 bg-gray-300 animate-pulse mx-auto rounded-md"></div>
                ) : (
                  <>
                    <p className="text-3xl font-bold text-gray-900 my-4">{partyVotes.toLocaleString()}</p>
                    <div className="my-4">
                      <Progress
                        value={votePercentage}
                        max={100}
                        className={cn("h-4 rounded-lg", color)}
                      />
                      <p className="text-sm mt-2 font-semibold">{votePercentage.toFixed(2)}%</p>
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
