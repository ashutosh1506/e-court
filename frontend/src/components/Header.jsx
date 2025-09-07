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
        className="relative flex items-center justify-center text-center text-white 
                   h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-screen px-4"
        style={{
          backgroundImage:
            "url('https://d2u1z1lopyfwlx.cloudfront.net/thumbnails/abf8996f-352b-5cf2-940d-abc4fd77599d/aea87596-f96d-554b-b6b6-3f49ba6ea7ca.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-black/40"></div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-3xl animate-fadeIn">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 sm:mb-6 drop-shadow-lg leading-snug">
            Virtual Portal
          </h1>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-200 mb-6 sm:mb-8 leading-relaxed px-2 sm:px-6">
            Digital transformation of the Indian Judiciary. Access court
            services, file cases, and track proceedings online.
          </p>
          <button className="btn btn-accent text-neutral font-bold text-sm sm:text-base md:text-lg px-4 sm:px-6 md:px-8 py-2 sm:py-3 rounded-full shadow-lg hover:scale-105 hover:shadow-info transition">
            Access e-Court Services
          </button>
        </div>
      </section>

      {/* News Ticker */}
      <section className="bg-base-200 text-content flex items-center px-4 sm:px-6 py-2 sm:py-3 border-t border-base-300">
        <span className="text-primary font-bold mr-2 sm:mr-4 text-xs sm:text-sm md:text-base">
          LATEST
        </span>
        <div className="overflow-hidden w-full">
          <div
            key={index}
            className="animate-marquee inline-block whitespace-nowrap 
                       text-xs sm:text-sm md:text-base"
          >
            {messages[index]}
          </div>
        </div>
      </section>

      {/* Animations */}
      <style jsx="true">{`
        .animate-fadeIn {
          animation: fadeIn 1.2s ease-in-out;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-marquee {
          animation: marquee 6s linear infinite;
        }
        @keyframes marquee {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(-100%);
          }
        }
      `}</style>
    </>
  );
}
