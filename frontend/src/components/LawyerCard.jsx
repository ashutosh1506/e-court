import React, { useState } from "react";
import LawyerModal from "./LawyerModal";

const LawyerCard = ({ lawyer }) => {
  const [showModal, setShowModal] = useState(false);

  const handleContactClick = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  return (
    <>
      <div className="card bg-base-100 w-full shadow-sm">
        <figure>
          <img
            src={lawyer.image || "https://cdn.pixabay.com/photo/2018/04/18/18/56/user-3331256_1280.png"}
            alt={lawyer.fullName}
            className="object-cover h-48 w-full"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{lawyer.fullName}</h2>
          <h4>{lawyer.state}</h4>
          <div className="card-actions justify-end">
            <button className="btn btn-primary" onClick={handleContactClick}>
              Contact Now
            </button>
          </div>
        </div>
      </div>

      {showModal && (
        <LawyerModal lawyerId={lawyer._id} onClose={handleClose} />
      )}
    </>
  );
};

export default LawyerCard;
