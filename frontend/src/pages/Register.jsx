import { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const { user } = useSelector((state) => state.user);
  const backendURL = import.meta.env.VITE_BACKEND_URL;
  const [confirmPassword, setConfirmPassword] = useState("");

  const [formData, setFormData] = useState({
    fullName: "",
    dob: "",
    email: "",
    phone: "",
    barAssociationNo: "",
    gender: "",
    state: "",
    password: "",
    image: "", // image URL (optional)
    lawyerType: "", // required for lawyers
  });

  const navigate = useNavigate();

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

  const lawyerTypes = [
    "Criminal",
    "Civil",
    "Family",
    "Corporate",
    "Property",
    "Tax",
    "Others",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const isValidUrl = (u) => !u || /^https?:\/\/[^\s$.?#].[^\s]*$/i.test(u); // allow empty, or valid http/https

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    if (user === "lawyer" && !formData.lawyerType) {
      toast.error("Please select lawyer type");
      return;
    }

    if (!isValidUrl(formData.image)) {
      toast.error("Invalid image URL");
      return;
    }

    try {
      let response;
      if (user === "lawyer") {
        response = await axios.post(backendURL + "/lawyers/register", formData);
      } else {
        // for clients we don't send lawyer-specific fields usually, but backend should ignore extras
        response = await axios.post(backendURL + "/clients/register", formData);
      }

      if (response.data.success) {
        toast.success("Registration Successful!");
        navigate("/login");
      } else {
        toast.error(response.data.message || "Registration failed");
      }
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-100 mt-10">
      <div className="card w-full max-w-4xl shadow-2xl bg-base-100 m-4 lg:-mt-10">
        <form className="card-body" onSubmit={handleSubmit}>
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
                <span className="label-text">Phone Number</span>
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter phone number"
                className="input input-bordered"
                required
              />
            </div>

            {user === "lawyer" && (
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Bar Association No</span>
                </label>
                <input
                  type="text"
                  name="barAssociationNo"
                  value={formData.barAssociationNo}
                  onChange={handleChange}
                  placeholder="Enter Bar Association No"
                  className="input input-bordered"
                  required
                />
              </div>
            )}

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
          <div className="flex items-center mb-4 mt-4">
            <label className="label block">
              <span className="label-text">Gender</span>
            </label>
            <div className="flex flex-row gap-6 ml-4">
              <label className="label cursor-pointer flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  onChange={handleChange}
                  checked={formData.gender === "Male"}
                  className="radio h-4 w-4 radio-primary"
                />
                <span className="label-text ml-1">Male</span>
              </label>
              <label className="label cursor-pointer flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  onChange={handleChange}
                  checked={formData.gender === "Female"}
                  className="radio h-4 w-4 radio-primary"
                />
                <span className="label-text ml-1">Female</span>
              </label>
              <label className="label cursor-pointer flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="Other"
                  onChange={handleChange}
                  checked={formData.gender === "Other"}
                  className="radio h-4 w-4 radio-primary"
                />
                <span className="label-text ml-1">Other</span>
              </label>
            </div>
          </div>

          {/* Lawyer-only fields */}
          {user === "lawyer" && (
            <>
              <h3 className="divider">Lawyer Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Lawyer Type</span>
                  </label>
                  <select
                    name="lawyerType"
                    value={formData.lawyerType}
                    onChange={handleChange}
                    className="select select-bordered w-full"
                    required
                  >
                    <option value="">Select Type</option>
                    {lawyerTypes.map((t, i) => (
                      <option key={i} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">
                      Profile Image URL (optional)
                    </span>
                  </label>
                  <input
                    type="url"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    placeholder="https://example.com/your-photo.jpg"
                    className="input input-bordered"
                  />
                </div>
              </div>
            </>
          )}

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
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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
