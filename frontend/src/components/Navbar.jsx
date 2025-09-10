import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { setRoleAsClient, setRoleAsLawyer, logout } from "../utils/userSlice";
import axios from "axios";
import { toast } from "react-toastify";
import { Menu, X } from "lucide-react"; // hamburger & close icons

export default function Navbar() {
  const [open, setOpen] = useState(false); // sidebar state
  const [dropdownOpen, setDropdownOpen] = useState(false); // desktop login dropdown
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
        setDropdownOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <>
      {/* Navbar */}
      <nav
        className={`navbar w-full z-50 px-6 py-3 flex justify-between items-center transition-colors duration-300 
          ${
            isHome
              ? "absolute top-0 left-0 bg-transparent text-white"
              : "sticky top-0 bg-base-200 text-black shadow"
          } `}
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

        {/* Desktop Links */}
        <ul className="hidden md:flex gap-8 items-center">
          <li>
            <Link to="/" className="hover:text-info">
              Home
            </Link>
          </li>
          <li>
            <Link to="/dashboard" className="hover:text-info">
              Dashboard
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

        {/* Desktop Auth */}
        <div className="hidden md:block relative z-20" ref={dropdownRef}>
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
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="btn border-2 border-neutral text-black font-bold"
              >
                Register/Login ▼
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg w-40">
                  <Link
                    to="/login"
                    className="block px-4 py-2 text-primary hover:bg-base-200 hover:text-black"
                    onClick={() => {
                      setDropdownOpen(false);
                      dispatch(setRoleAsLawyer());
                    }}
                  >
                    As Lawyer
                  </Link>
                  <Link
                    to="/login"
                    className="block px-4 py-2 text-primary hover:bg-base-200 hover:text-black"
                    onClick={() => {
                      setDropdownOpen(false);
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

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setOpen(true)}
          aria-label="Open Menu"
        >
          <Menu />
        </button>
      </nav>

      {/* Mobile Sidebar */}
      {open && (
        <div className="fixed inset-0 bg-black/50 z-50 flex">
          <div className="w-64 bg-base-100 shadow-lg h-full p-6 flex flex-col gap-6">
            {/* Close button */}
            <button
              className="self-end text-2xl"
              onClick={() => setOpen(false)}
              aria-label="Close Menu"
            >
              <X />
            </button>

            {/* Links */}
            <Link to="/" onClick={() => setOpen(false)} className="hover:text-info">
              Home
            </Link>
            <Link to="/dashboard" onClick={() => setOpen(false)} className="hover:text-info">
              Dashboard
            </Link>
            <Link to="/services" onClick={() => setOpen(false)} className="hover:text-info">
              Services
            </Link>
            <Link to="/about" onClick={() => setOpen(false)} className="hover:text-info">
              About
            </Link>
            <Link to="/contact" onClick={() => setOpen(false)} className="hover:text-info">
              Contact Us
            </Link>

            {/* Courts Dropdown (simple expand in sidebar) */}
            <details>
              <summary className="cursor-pointer hover:text-info">Courts</summary>
              <div className="ml-4 mt-2 flex flex-col gap-2">
                <Link to="/supreme-court" onClick={() => setOpen(false)}>
                  Supreme Court
                </Link>
                <Link to="/high-court" onClick={() => setOpen(false)}>
                  High Court
                </Link>
                <Link to="/district-court" onClick={() => setOpen(false)}>
                  District Court
                </Link>
              </div>
            </details>

            {/* Auth Buttons */}
            {isLoggedIn ? (
              <button
                onClick={() => {
                  handleLogout();
                  setOpen(false);
                }}
                className="btn shadow-xl bg-primary hover:bg-primary/80 text-white font-bold mt-4"
              >
                Logout
              </button>
            ) : (
              <>
                <button
                  onClick={() => {
                    dispatch(setRoleAsLawyer());
                    navigate("/login");
                    setOpen(false);
                  }}
                  className="btn border-2 border-neutral text-black font-bold"
                >
                  Login as Lawyer
                </button>
                <button
                  onClick={() => {
                    dispatch(setRoleAsClient());
                    navigate("/login");
                    setOpen(false);
                  }}
                  className="btn border-2 border-neutral text-black font-bold"
                >
                  Login as Client
                </button>
              </>
            )}
          </div>
          {/* Click outside closes sidebar */}
          <div
            className="flex-1"
            onClick={() => setOpen(false)}
          ></div>
        </div>
      )}
    </>
  );
}
