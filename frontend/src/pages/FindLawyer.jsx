import LawyerCard from "../components/LawyerCard";

const FindLawyer = () => {
  const cards = Array.from({ length: 16 });

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-extrabold tracking-tight text-primary text-center mb-10">
        Find Lawyer
      </h1>
      <div className="grid grid-cols-4 grid-rows-4 gap-6">
        {cards.map((_, idx) => (
          <LawyerCard key={idx} />
        ))}
      </div>
    </div>
  );
};

export default FindLawyer;
