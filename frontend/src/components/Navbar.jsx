import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { setRoleAsClient, setRoleAsLawyer, logout } from "../utils/userSlice";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();
  const dispatch = useDispatch();
  const { user, isLoggedIn } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const location = useLocation(); // 👈 get current route

  // Check if home page
  const isHome = location.pathname === "/";

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
    <nav
      className={`navbar absolute z-50 px-6 py-3 flex justify-between items-center transition-colors duration-300 
        ${isHome ? "bg-transparent text-white" : "bg-base-200 text-black shadow"} `}
    >
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
        <li>
          <Link to="/" className="hover:text-info">
            Home
          </Link>
        </li>
        <li>
          <Link to="/services" className="hover:text-info">
            Services
          </Link>
        </li>
        <li>
          <Link to="/about" className="hover:text-info">
            About
          </Link>
        </li>
        <li>
          <Link to="/contact" className="hover:text-info">
            Contact Us
          </Link>
        </li>
        <div className="dropdown dropdown-hover">
          <label
            tabIndex={0}
            className="cursor-pointer hover:text-info transition"
          >
            Courts ↓
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu p-2 shadow bg-info rounded-box w-40"
          >
            <li>
              <Link to="/supreme-court">Supreme Court</Link>
            </li>
            <li>
              <Link to="/high-court">High Court</Link>
            </li>
            <li>
              <Link to="/district-court">District Court</Link>
            </li>
          </ul>
        </div>
      </ul>

      {/* Register/Login or Logout */}
      <div className="relative z-20" ref={dropdownRef}>
        {isLoggedIn ? (
          <button
            // onClick={handleLogout}
            className="btn btn-warning text-black font-bold"
          >
            Logout
          </button>
        ) : (
          <>
            <button
              onClick={() => setOpen(!open)}
              className="btn z-100 border-2 border-neutral text-black font-bold"
            >
              Register/Login ▼
            </button>
            {open && (
              <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg w-40">
                <Link
                  to="/login"
                  className="block px-4 py-2 text-primary hover:bg-base-200 hover:text-black"
                  onClick={() => {
                    setOpen(false);
                    dispatch(setRoleAsLawyer());
                  }}
                >
                  As Lawyer
                </Link>
                <Link
                  to="/login"
                  className="block px-4 py-2 text-primary hover:bg-base-200 hover:text-black"
                  onClick={() => {
                    setOpen(false);
                    dispatch(setRoleAsClient());
                  }}
                >
                  As Client
                </Link>
              </div>
            )}
          </>
        )}
      </div>
    </nav>
  );
}
