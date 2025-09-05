const LawyerStats = () => {
  const stats = [
    {
      title: "Total Cases Registered",
      value: "150",
      icon: "https://img.icons8.com/?size=100&id=t5GRNS5yIsHP&format=png&color=000000",
    },
    {
      title: "Cases Won",
      value: "120",
      icon: "https://img.icons8.com/?size=100&id=101825&format=png&color=000000",
    },
    {
      title: "Cases Pending",
      value: "5",
      icon: "https://img.icons8.com/?size=100&id=15854&format=png&color=000000",
    },
    {
      title: "Cases Lost",
      value: "25",
      icon: "https://img.icons8.com/?size=100&id=2PoOVhFsZ1Vj&format=png&color=000000",
    },
    {
      title: "Rating",
      value: "4.5",
      icon: "https://img.icons8.com/?size=100&id=11674&format=png&color=000000",
    },
    {
      title: "Won Percentage",
      value: "80%",
      icon: "https://img.icons8.com/?size=100&id=0pVEpca9qtu2&format=png&color=000000",
    },
    {
      title: "Number of Employees",
      value: "50",
      icon: "https://img.icons8.com/?size=100&id=11699&format=png&color=000000",
    },
    {
      title: "Years of Experience",
      value: "10",
      icon: "https://img.icons8.com/?size=100&id=25044&format=png&color=000000",
    },
    {
      title: "Resolved Today",
      value: "7",
      icon: "https://img.icons8.com/?size=100&id=K7UWQpIZgEo1&format=png&color=000000",
    },
  ];

  return (
    <div className="min-h-screen flex mt-20">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-primary mb-6 sm:mb-8">
          Stats
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {stats.map((s, idx) => (
            <div
              key={idx}
              className="stats shadow-md hover:shadow-lg transition duration-200 "
            >
              <div className="stat gap-2 sm:gap-3">
                <div className="stat-figure text-secondary">
                  <img
                    src={s.icon}
                    alt={s.title}
                    className="inline-block h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 stroke-current"
                  />
                </div>
                <div className="stat-title text-sm lg:text-lg">{s.title}</div>
                <div className="stat-value text-xl lg:text-3xl">{s.value}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LawyerStats;
