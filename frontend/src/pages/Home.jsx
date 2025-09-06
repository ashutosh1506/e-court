import Footer from "../components/Footer";
import Header from "../components/header";
import Navbar from "../components/Navbar";

export default function Home() {
  const notices = [
    {
      date: "4 Dec 2024 - 23:00",
      category: "Digital Innovation",
      title: "Supreme Court Digital Initiative Launch",
      desc: "New digital platform for case filing and tracking now available for all High Courts across India.",
      link: "https://informatics.nic.in/files/websites/april-2024/Key-digital-tnitiatives-launched-in-celebration-of-the-supreme-courts-diamond-jubilee.php",
    },
    {
      date: "10 Aug 2024 - 13:00",
      category: "Virtual Hearings",
      title: "High Court Virtual Hearing Guidelines",
      desc: "Updated guidelines for virtual hearings and e-proceeding protocols issued by the Chief Justice.",
      link: "https://highcourtchd.gov.in/sub_pages/left_menu/Rules_orders/high_court_rules/Vol-V--PDF/chap1partHV5.pdf",
    },
    {
      date: "22 July 2024 - 15:00",
      category: "Case Management",
      title: "National Judicial Data Grid Updates",
      desc: "Enhanced case management system with real-time tracking and automated notifications for lawyers and litigants.",
      link: "https://ecommitteesci.gov.in/service/national-judicial-data-grid/",
    },
  ];

  return (
    <>
      <Navbar />
      <Header />
      <section className="bg-base-200 py-12 flex flex-col items-center">
        <h2 className="text-3xl font-bold text-primary mb-8">
          Notices & Updates
        </h2>
        <div className="w-full max-w-3xl flex flex-col gap-6">
          {notices.map((n, i) => (
            <div
              key={i}
              className="card bg-white shadow-lg border-l-4 border-warning p-6 relative"
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="text-sm text-gray-500">{n.date}</span>
                <span className="badge badge-warning text-black">
                  {n.category}
                </span>
              </div>
              <a
                href={n.link}
                className="text-lg font-bold text-primary hover:text-warning"
              >
                {n.title}
              </a>
              <p className="text-sm text-gray-600 mt-2">{n.desc}</p>
              <a href={n.link} className="absolute top-4 right-4">
                <img
                  src="https://static.thenounproject.com/png/external-link-icon-389539-512.png"
                  alt="Link Icon"
                  className="w-5 h-5 opacity-70 hover:opacity-100"
                />
              </a>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <a href="#" className="btn btn-primary text-white rounded-full">
            View All Notices & Updates
          </a>
        </div>
      </section>
      <Footer />
    </>
  );
}
