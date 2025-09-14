import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { setClientProfile, setLawyerProfile } from "../utils/userSlice";

const Profile = () => {
  const [client, setClient] = useState(null);

  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { clientProfile, lawyerProfile } = useSelector((state) => state.user);
  const backendURL = import.meta.env.VITE_BACKEND_URL;

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
  const [formData, setFormData] = useState({
    fullName: "",
    dob: "",
    phone: "",
    barAssociationNo: "",
    gender: "",
    state: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const getUserDetails = async () => {
    try {
      const token = localStorage.getItem("token");
      let res;
      if (user === "client") {
        const clientId = localStorage.getItem("clientId");
        res = await axios.get(backendURL + `/clients/details/${clientId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        const lawyerId = localStorage.getItem("lawyerId");
        res = await axios.get(backendURL + `/lawyers/details/${lawyerId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }

      const profile = res.data.data;
      setClient(profile);
      if (user === "client") {
        dispatch(setClientProfile(profile));
      } else {
        dispatch(setLawyerProfile(profile));
      }
      setFormData({
        fullName: profile.fullName || "",
        dob: profile.dob ? profile.dob.slice(0, 10) : "",
        phone: profile.phone || "",
        barAssociationNo: profile.barAssociationNo || "",
        gender: profile.gender || "",
        state: profile.state || "",
      });
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      let response;
      if (user === "lawyer") {
        response = await axios.put(
          backendURL + "/lawyers/editLawyerProfile",
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        response = await axios.put(
          backendURL + "/clients/editClientProfile",
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }

      if (response.data.success) {
        const updated = response.data.data;
        setClient(updated);
        if (user === "client") {
          dispatch(setClientProfile(updated));
        } else {
          dispatch(setLawyerProfile(updated));
        }
        setFormData({
          fullName: updated.fullName || "",
          dob: updated.dob ? updated.dob.slice(0, 10) : "",
          phone: updated.phone || "",
          barAssociationNo: updated.barAssociationNo || "",
          gender: updated.gender || "",
          state: updated.state || "",
        });
        toast.success("Profile Updated Successfully!");
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!");
    }
  };
  useEffect(() => {
    const cached = user === "client" ? clientProfile : lawyerProfile;
    if (cached) {
      setClient(cached);
      setFormData({
        fullName: cached.fullName || "",
        dob: cached.dob ? cached.dob.slice(0, 10) : "",
        phone: cached.phone || "",
        barAssociationNo: cached.barAssociationNo || "",
        gender: cached.gender || "",
        state: cached.state || "",
      });
    } else {
      getUserDetails();
    }
  }, []);

  if (!client) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-base-100/90  p-10 -mt-10">
        <div className="text-xl font-semibold text-primary">
          Loading profile...
        </div>
      </div>
    );
  }
  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-base-100/90 lg:-mt-10">
      <div className="flex flex-col lg:flex-row items-center lg:items-stretch justify-center gap-x-20 lg:h-160">
        {/* Left: Profile Card */}
        <div className="flex flex-col bg-base-100 shadow-xl rounded-xl w-full lg:w-2/3 max-w-md h-full hover:shadow-2xl transition duration-200 mb-10 lg:mb-0">
          <div className="mx-auto w-40 p-6">
            <img
              src="https://img.daisyui.com/images/profile/demo/batperson@192.webp"
              className="rounded-full shadow-lg border-4 border-primary"
            />
          </div>
          <div className="p-6">
            <h2 className="text-center text-2xl font-bold text-primary -mt-2">
              Details
            </h2>
            <div className="mt-6 bg-base-200/50 rounded-lg p-6 shadow-md">
              <h3 className="text-lg font-bold text-primary mb-4 border-b pb-2">
                Profile Details
              </h3>
              <div className="grid grid-cols-2 gap-y-3 gap-x-6 text-base-content overflow-auto">
                <p className="font-semibold">Name:</p>
                <p className="text-right">{client.fullName}</p>
                <p className="font-semibold">Gender:</p>
                <p className="text-right">{client.gender}</p>
                <p className="font-semibold">DOB:</p>
                <p className="text-right">
                  {client.dob ? client.dob.slice(0, 10) : ""}
                </p>
                <p className="font-semibold">Mail:</p>
                <p className="text-right">{client.email}</p>
                <p className="font-semibold">Contact No.:</p>
                <p className="text-right">{client.phone}</p>
                {user === "lawyer" && (
                  <p className="font-semibold">Bar Association No.:</p>
                )}
                {user === "lawyer" && (
                  <p className="text-right">{client.barAssociationNo}</p>
                )}
                <p className="font-semibold">State:</p>
                <p className="text-right">{client.state}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="hidden lg:flex opacity-70 divider divider-horizontal self-stretch"></div>

        {/* Right: Edit Profile Form */}
        <div className="flex items-stretch justify-center w-full lg:w-1/2 max-w-lg hover:shadow-2xl transition duration-200">
          <div className="card w-full h-full bg-base-100 shadow-xl p-8 rounded-xl">
            <h2 className="text-2xl font-bold text-center text-secondary mb-6">
              Edit Your Profile
            </h2>
            <form className="space-y-4">
              <div className="form-control">
                <label className="label font-semibold">Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className="input input-bordered w-full"
                />
              </div>

              <div className="form-control">
                <label className="label font-semibold">Gender</label>
                <select
                  className="select select-bordered w-full"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="form-control">
                <label className="label font-semibold">Date of Birth</label>
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                />
              </div>

              {user === "lawyer" && (
                <div className="form-control">
                  <label className="label font-semibold">
                    Bar Association No.
                  </label>
                  <input
                    type="text"
                    name="barAssociationNo"
                    value={formData.barAssociationNo}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                  />
                </div>
              )}
              <div className="form-control">
                <label className="label font-semibold">Contact No.</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                />
              </div>
              <div className="form-control">
                <label className="label font-semibold">State</label>
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

              <div className="form-control mt-6">
                <button
                  className="btn btn-primary w-full"
                  onClick={handleProfileUpdate}
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
