import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { setRoleAsClient, setRoleAsLawyer, logout } from "../utils/userSlice";
import axios from "axios";
import { toast } from "react-toastify";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();
  const dispatch = useDispatch();
  const { user, isLoggedIn } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const location = useLocation();

  const isHome = location.pathname === "/";

  const handleLogout = async () => {
    try {
      const backendURL = import.meta.env.VITE_BACKEND_URL;
      const token = localStorage.getItem("token");
      const isLawyer = user === "lawyer";

      const url = isLawyer
        ? `${backendURL}/lawyers/logout`
        : `${backendURL}/clients/logout`;

      await axios.get(url, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });

      localStorage.removeItem("token");
      localStorage.removeItem("role");
      dispatch(logout());
      toast.success("Logged out successfully");
      navigate("/");
    } catch (error) {
      console.error(error.response?.data || error.message);
      toast.error("Failed to logout. Please try again.");
    }
  };

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
      className={`navbar w-full z-50 px-6 py-3 flex justify-between items-center transition-colors duration-300 
        ${
          isHome
            ? "absolute top-0 left-0 bg-transparent text-white"
            : "sticky top-0 bg-base-200 text-black shadow"
        } `}
    >
      <div className="flex items-center gap-3">
        <img
          src="https://thumbs.dreamstime.com/b/justice-scale-grunge-texture-as-symbol-law-vintage-parchment-texture-as-concept-old-legal-system-36389701.jpg"
          alt="Logo"
          className="w-12 h-12 rounded-full object-cover"
        />
        <span className="text-xl font-bold">Virtual-Portal</span>
      </div>
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
            className="dropdown-content menu p-2 shadow rounded-box w-40"
          >
            <li className="hover:bg-primary">
              <Link to="/supreme-court">Supreme Court</Link>
            </li>
            <li className="hover:bg-primary">
              <Link to="/high-court">High Court</Link>
            </li>
            <li className="hover:bg-primary">
              <Link to="/district-court">District Court</Link>
            </li>
          </ul>
        </div>
      </ul>

      <div className="relative z-20" ref={dropdownRef}>
        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="btn shadow-xl bg-primary hover:bg-primary/80 text-white font-bold"
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
