import { lazy, Suspense, useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import ContactUs from "./pages/ContactUs";
import AboutUs from "./pages/AboutUs";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Services from "./pages/Services";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import { setLogin, setRoleAsClient, setRoleAsLawyer } from "./utils/userSlice";
import "react-toastify/dist/ReactToastify.css";
import MeetingRoom from "./pages/MeetingRoom";
import CaseDetails from "./components/CaseDetails";

const Dashboard = lazy(() => import("./pages/Dashboard"));
const Profile = lazy(() => import("./components/Profile"));
const RegisterNewCase = lazy(() => import("./components/RegisterNewCase"));
const CaseStatus = lazy(() => import("./components/CaseStatus"));
const LawyerStats = lazy(() => import("./components/LawyerStats"));
const FindLawyer = lazy(() => import("./pages/FindLawyer"));

const App = () => {
  // rehydrate on load
  const dispatch = useDispatch();
  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (role === "lawyer") {
      dispatch(setRoleAsLawyer());
    } else if (role === "client") {
      dispatch(setRoleAsClient());
    }
    if (token) {
      dispatch(setLogin());
    }
  }, [dispatch]);

  return (
    <BrowserRouter basename="/">
      <Navbar />
      <Suspense fallback={<p>Loading page...</p>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/services" element={<Services />} />

          <Route path="/dashboard" element={<Dashboard />}>
            <Route index element={<Navigate to="profile" replace />} />
            <Route path="profile" element={<Profile />} />
            <Route path="register-case" element={<RegisterNewCase />} />
            <Route path="case-status" element={<CaseStatus />} />
            <Route path="lawyer-stats" element={<LawyerStats />} />
            <Route path="find-lawyer" element={<FindLawyer />} />
            <Route path="meeting-room" element={<MeetingRoom />} />
            <Route path="case-details" element={<CaseDetails />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
      <Footer />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        newestOnTop
        pauseOnHover
        closeOnClick
      />
    </BrowserRouter>
  );
};

export default App;
