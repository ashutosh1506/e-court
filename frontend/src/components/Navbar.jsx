import { useState, useEffect, useRef } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <nav className="navbar bg-primary text-white px-6 py-3 flex justify-between items-center">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <img
          src="https://thumbs.dreamstime.com/b/justice-scale-grunge-texture-as-symbol-law-vintage-parchment-texture-as-concept-old-legal-system-36389701.jpg"
          alt="Logo"
          className="w-12 h-12 rounded-full object-cover"
        />
        <span className="text-xl font-bold">Virtual-Portal</span>
      </div>

      {/* Nav Links */}
      <ul className="hidden md:flex gap-8">
        <li><a href="#" className="hover:text-warning">Home</a></li>
        <li><a href="#" className="hover:text-warning">Services</a></li>
        <li><a href="#" className="hover:text-warning">About</a></li>
        <li><a href="#" className="hover:text-warning">Contact Us</a></li>
        <li><a href="#" className="hover:text-warning">Courts ↓</a></li>
      </ul>

      {/* Register/Login Dropdown */}
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setOpen(!open)}
          className="btn btn-warning text-black font-bold"
        >
          Register/Login ▼
        </button>
        {open && (
          <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg w-40">
            <a href="#" className="block px-4 py-2 text-primary hover:bg-warning hover:text-black">As Lawyer</a>
            <a href="#" className="block px-4 py-2 text-primary hover:bg-warning hover:text-black">As Client</a>
          </div>
        )}
      </div>
    </nav>
  );
}
