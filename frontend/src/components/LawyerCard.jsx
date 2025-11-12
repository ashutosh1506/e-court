const LawyerCard = ({ lawyer }) => {
  return (
    <div className="card bg-base-100 w-full shadow-sm">
      <figure>
        <img
          src="https://legaldesire.com/wp-content/uploads/2021/04/AdobeStock_205600667.jpeg"
          alt="User"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{lawyer.fullName}</h2>
        <h4>{lawyer.state}</h4>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Contact Now</button>
        </div>
      </div>
    </div>
  );
};

export default LawyerCard;
