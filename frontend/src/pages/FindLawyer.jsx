import { useEffect, useState } from "react";
import LawyerCard from "../components/LawyerCard";

const FindLawyer = () => {
  const [lawyers, setLawyers] = useState([]);
  const [loading, setLoading] = useState(true);
  const backendURL = import.meta.env.VITE_BACKEND_URL;
  useEffect(() => {
    const fetchLawyers = async () => {
      try {
        const response = await fetch(backendURL + "/lawyers/details ");
        const result = await response.json();

        if (response.ok) {
          setLawyers(result.data);
        } else {
          console.error("Error fetching lawyers:", result.message);
        }
      } catch (error) {
        console.error("Error fetching lawyers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLawyers();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg text-gray-600">Loading lawyers...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-extrabold tracking-tight text-primary text-center mb-10">
        Find Lawyer
      </h1>

      {lawyers.length === 0 ? (
        <p className="text-center text-gray-600">No lawyers found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {lawyers.map((lawyer) => (
            <LawyerCard key={lawyer._id} lawyer={lawyer} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FindLawyer;
