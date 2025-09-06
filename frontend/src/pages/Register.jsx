import React, { useState } from "react";
//import axios from "axios";
//import { toast } from "react-toastify";
//import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    dob: "",
    email: "",
    mobile: "",
    barNo: "",
    gender: "",
    state: "",
    password: "",
    confirmPassword: "",
  });

  //const navigate = useNavigate();

  const states = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Delhi",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jammu & Kashmir",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (formData.password !== formData.confirmPassword) {
  //     toast.error("Passwords do not match!");
  //     return;
  //   }
  //   try {
  //     const response = await axios.post(
  //       "http://localhost:5000/api/lawyer/register",
  //       formData
  //     );
  //     if (response.data.success) {
  //       toast.success("Registration Successful!");
  //       navigate("/login");
  //     } else {
  //       toast.error(response.data.message);
  //     }
  //   } catch (err) {
  //     console.error(err);
  //     toast.error("Something went wrong!");
  //   }
  // };

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200">
      <div className="card w-full max-w-4xl shadow-2xl bg-base-100 m-4">
        <form /*onSubmit={handleSubmit} */ className="card-body">
          <h2 className="text-2xl font-bold text-center mb-6">
            Registration Form
          </h2>

          {/* Personal Details */}
          <h3 className="divider">Personal Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Full Name</span>
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter your name"
                className="input input-bordered"
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Date of Birth</span>
              </label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                className="input input-bordered"
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="input input-bordered"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Mobile Number</span>
              </label>
              <input
                type="tel"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                placeholder="Enter mobile number"
                className="input input-bordered"
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Bar Association No</span>
              </label>
              <input
                type="text"
                name="barNo"
                value={formData.barNo}
                onChange={handleChange}
                placeholder="Enter Bar Association No"
                className="input input-bordered"
                required
              />
            </div>

            <div className="form-control">
              <label className="label block">
                <span className="label-text">State</span>
              </label>
              <select
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="select select-bordered w-full"
                required
              >
                <option value="">Select State</option>
                {states.map((s, i) => (
                  <option key={i} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Gender */}
          <h3 className="divider">Gender</h3>
          <div className="form-control">
            <div className="flex flex-wrap gap-6">
              <label className="label cursor-pointer">
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  onChange={handleChange}
                  checked={formData.gender === "Male"}
                  className="radio radio-primary"
                />
                <span className="label-text ml-2">Male</span>
              </label>
              <label className="label cursor-pointer">
                <input
                  type="radio"
                  name="gender"
                  value="Trans"
                  onChange={handleChange}
                  checked={formData.gender === "Trans"}
                  className="radio radio-primary"
                />
                <span className="label-text ml-2">Trans</span>
              </label>
              <label className="label cursor-pointer">
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  onChange={handleChange}
                  checked={formData.gender === "Female"}
                  className="radio radio-primary"
                />
                <span className="label-text ml-2">Female</span>
              </label>
            </div>
          </div>

          {/* Password Section */}
          <h3 className="divider">Choose Password</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Password */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
                className="input input-bordered w-full"
                required
              />
            </div>
            {/* Confirm Password */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Confirm Password</span>
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm password"
                className="input input-bordered w-full"
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="form-control mt-6">
            <button type="submit" className="btn btn-primary w-full">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
