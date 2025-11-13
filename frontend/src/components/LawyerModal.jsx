import React, { useEffect, useState } from "react";

const LawyerModal = ({ lawyerId, onClose }) => {
  const [lawyer, setLawyer] = useState(null);

//   useEffect(() => {
//     const fetchLawyer = async () => {
//       try {
//         const res = await fetch(`http://localhost:5000/api/lawyers/details/${lawyerId}`);
//         const data = await res.json();
//         setLawyer(data.data);
//       } catch (err) {
//         console.error("Error fetching lawyer details:", err);
//       }
//     };
//     fetchLawyer();
//   }, [lawyerId]);

//   if (!lawyer) return null;

  return (
  <div className="fixed inset-0 bg-gray-900/30 backdrop-blur-md flex justify-center items-center z-50 animate-fadeIn">
    <div className="relative bg-white shadow-2xl rounded-2xl w-full lg:w-2/3 max-w-md transform transition-all duration-300 scale-100 hover:scale-[1.02] overflow-hidden">
      
      {/* Close button */}
      <button
        className="absolute top-3 right-3 text-black hover:text-gray-500 text-3xl font-bold transition duration-200"
        onClick={onClose}
      >
        ×
      </button>

      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-blue-400 text-white py-4 text-center rounded-t-2xl shadow-md">
        <h2 className="text-2xl font-semibold tracking-wide">Lawyer Profile</h2>
      </div>

      {/* Profile Section */}
      <div className="flex flex-col items-center p-6">
        <img
          src="https://cdn.pixabay.com/photo/2018/04/18/18/56/user-3331256_1280.png"
          alt="Lawyer"
          className="w-32 h-32 rounded-full border-4 border-primary shadow-lg mb-4"
        />
        <h3 className="text-xl font-bold text-primary mb-1">Dev</h3>
        <p className="text-gray-500 text-sm mb-4">Civil Lawyer - Delhi</p>

        {/* Details Container */}
        <div className="w-full space-y-6">

          {/* Section 1: Lawyer Details */}
          <div className="bg-gray-50 rounded-lg p-6 shadow-inner">
            <h3 className="text-lg font-semibold text-primary mb-4 border-b-2 border-primary/30 pb-2">
              Lawyer Details
            </h3>
            <div className="grid grid-cols-2 gap-y-3 gap-x-6 text-gray-700 text-sm">
              <p className="font-semibold">Name:</p>
              <p className="text-right">Dev</p>

              <p className="font-semibold">Gender:</p>
              <p className="text-right">Male</p>

              <p className="font-semibold">DOB:</p>
              <p className="text-right">2024-01-01</p>

              <p className="font-semibold">State:</p>
              <p className="text-right">Delhi</p>
            </div>
          </div>

          {/* Section 2: Contact Details */}
          <div className="bg-gray-50 rounded-lg p-6 shadow-inner">
            <h3 className="text-lg font-semibold text-primary mb-4 border-b-2 border-primary/30 pb-2">
              Contact Details
            </h3>
            <div className="grid grid-cols-2 gap-y-3 gap-x-6 text-gray-700 text-sm">
              <p className="font-semibold">Email:</p>
              <p className="text-right break-all">dev@gmail.com</p>

              <p className="font-semibold">Mobile No.:</p>
              <p className="text-right">816737988</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

};

export default LawyerModal;
