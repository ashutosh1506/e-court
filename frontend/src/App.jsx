import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import CaseStatus from "./components/CaseStatus";
import LawyerStats from "./components/LawyerStats";
import Profile from "./components/Profile";
import RegisterNewCase from "./components/RegisterNewCase";
import ContactUs from "./pages/ContactUs";
import Dashboard from "./pages/Dashboard";
import FindLawyer from "./pages/FindLawyer";
import AboutUs from "./pages/AboutUs";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Services from "./pages/Services";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { setLogin, setRoleAsClient, setRoleAsLawyer } from "./utils/userSlice";
import "react-toastify/dist/ReactToastify.css";

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
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
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
