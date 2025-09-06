import { useEffect, useState } from "react";

export default function Header() {
  const messages = [
    "Enter the Video Hearing by your Face ID",
    "Find and approach best lawyers",
    "New version 1.1 will be launched soon",
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section
        className="relative h-[90vh] flex items-center justify-center text-center text-white"
        style={{
          backgroundImage:
            "url('https://japanupclose.web-japan.org/files/100438998.jpeg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-primary/60"></div>
        <div className="relative z-10 max-w-3xl">
          <h1 className="text-6xl font-extrabold mb-4">Virtual Portal</h1>
          <p className="text-xl text-warning mb-6">
            Digital transformation of the Indian Judiciary. Access court
            services, file cases, and track proceedings online.
          </p>
          <button className="btn btn-warning text-black font-bold text-lg px-6 py-3">
            Access e-Court Services
          </button>
        </div>
      </section>

      {/* News Ticker */}
      <section className="bg-neutral text-white flex items-center px-6 py-3">
        <span className="text-warning font-bold mr-4">LATEST |</span>
        <div className="overflow-hidden w-full">
          <div
            key={index}
            className="animate-slide inline-block whitespace-nowrap"
          >
            {messages[index]}
          </div>
        </div>
      </section>
    </>
  );
}
