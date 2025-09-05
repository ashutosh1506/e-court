const LawyerCard = () => {
  return (
    <div className="card bg-base-100 w-full shadow-sm">
      <figure>
        <img
          src="https://cdn.pixabay.com/photo/2018/04/18/18/56/user-3331256_1280.png"
          alt="User"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">Lawyer Name</h2>
        <h4>Lawyer Type</h4>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Contact Now</button>
        </div>
      </div>
    </div>
  );
};

export default LawyerCard;
