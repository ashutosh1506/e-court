import CaseStatus from "./components/CaseStatus";
import LawyerStats from "./components/LawyerStats";
import Profile from "./components/Profile";
import RegisterNewCase from "./components/RegisterNewCase";
import ContactUs from "./pages/ContactUs";
import Dashboard from "./pages/Dashboard";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import FindLawyer from "./pages/FindLawyer";
import AboutUs from "./pages/AboutUs";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Services from "./pages/Services";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
const App = () => {
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
    </BrowserRouter>
  );
};

export default App;
