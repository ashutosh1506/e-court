import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { setRoleAsClient, setRoleAsLawyer, logout } from "../utils/userSlice";
import axios from "axios";
import { toast } from "react-toastify";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [renderSidebar, setRenderSidebar] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();
  const triggerBtnRef = useRef();
  const closeBtnRef = useRef();
  const closeTimeoutRef = useRef();
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

  useEffect(() => {
    if (!renderSidebar) return;
    const handleKey = (e) => {
      if (e.key === "Escape") closeSidebar();
    };
    document.addEventListener("keydown", handleKey);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = originalOverflow;
    };
  }, [renderSidebar]);

  const openSidebar = () => {
    if (renderSidebar) return;
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = undefined;
    }
    setRenderSidebar(true);
    requestAnimationFrame(() => {
      setOpen(true);
      requestAnimationFrame(() => closeBtnRef.current?.focus());
    });
  };
  const closeSidebar = () => {
    setOpen(false);
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    closeTimeoutRef.current = setTimeout(() => {
      setRenderSidebar(false);
      triggerBtnRef.current?.focus();
      closeTimeoutRef.current = undefined;
    }, 300);
  };

  return (
    <>
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
        <div className="hidden md:block relative z-20" ref={dropdownRef}>
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="btn  bg-primary hover:bg-primary/80 text-white border-0 font-bold"
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
                <div className="absolute left-0 right-0 mt-2 bg-white shadow-lg rounded-lg">
                  <Link
                    to="/login"
                    className="block px-4 py-2 text-primary hover:bg-primary/10 hover:rounded-lg"
                    onClick={() => {
                      setDropdownOpen(false);
                      dispatch(setRoleAsLawyer());
                    }}
                  >
                    As Lawyer
                  </Link>
                  <Link
                    to="/login"
                    className="block px-4 py-2 text-primary hover:bg-primary/10 hover:rounded-lg"
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
        <button
          className="md:hidden text-2xl"
          onClick={openSidebar}
          aria-label="Open Menu"
          ref={triggerBtnRef}
        >
          <Menu />
        </button>
      </nav>
      {/* Sidebar */}
      {renderSidebar && (
        <div
          className={`fixed inset-0 z-50 flex ${
            open ? "pointer-events-auto" : "pointer-events-none"
          }`}
          role="presentation"
        >
          <div
            className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${
              open ? "opacity-100" : "opacity-0"
            }`}
            onClick={closeSidebar}
            aria-hidden="true"
          />
          <div
            className={`relative w-64 bg-base-100 shadow-lg h-full p-6 flex flex-col gap-6 transform transition-transform duration-300 ease-in-out ${
              open ? "translate-x-0" : "-translate-x-full"
            }`}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Menu"
          >
            <button
              className="self-end text-2xl cursor-pointer"
              onClick={closeSidebar}
              aria-label="Close Menu"
              ref={closeBtnRef}
            >
              <X />
            </button>

            <Link to="/" onClick={closeSidebar} className="hover:text-info">
              Home
            </Link>
            <Link
              to="/dashboard"
              onClick={closeSidebar}
              className="hover:text-info"
            >
              Dashboard
            </Link>
            <Link
              to="/services"
              onClick={closeSidebar}
              className="hover:text-info"
            >
              Services
            </Link>
            <Link
              to="/about"
              onClick={closeSidebar}
              className="hover:text-info"
            >
              About
            </Link>
            <Link
              to="/contact"
              onClick={closeSidebar}
              className="hover:text-info"
            >
              Contact Us
            </Link>
            <details>
              <summary className="cursor-pointer hover:text-info">
                Courts
              </summary>
              <div className="ml-4 mt-2 flex flex-col gap-2 ">
                <Link
                  to="/supreme-court"
                  className="hover:text-black/60"
                  onClick={closeSidebar}
                >
                  Supreme Court
                </Link>
                <Link
                  to="/high-court"
                  className="hover:text-black/60"
                  onClick={closeSidebar}
                >
                  High Court
                </Link>
                <Link
                  to="/district-court"
                  className="hover:text-black/60"
                  onClick={closeSidebar}
                >
                  District Court
                </Link>
              </div>
            </details>
            {isLoggedIn ? (
              <button
                onClick={() => {
                  handleLogout();
                  closeSidebar();
                }}
                className="btn shadow-xl bg-primary hover:bg-primary/80 text-white font-bold w-40"
              >
                Logout
              </button>
            ) : (
              <>
                <button
                  onClick={() => {
                    dispatch(setRoleAsLawyer());
                    navigate("/login");
                    closeSidebar();
                  }}
                  className="btn shadow-xl bg-primary hover:bg-primary/80 text-white font-bold w-40"
                >
                  Login as Lawyer
                </button>
                <button
                  onClick={() => {
                    dispatch(setRoleAsClient());
                    navigate("/login");
                    closeSidebar();
                  }}
                  className="btn shadow-xl bg-primary hover:bg-primary/80 text-white font-bold w-40 -mt-4"
                >
                  Login as Client
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
