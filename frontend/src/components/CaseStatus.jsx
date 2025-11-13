import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCaseData } from "../utils/caseSlice";
import { toast } from "react-toastify";

// CNR : 2D937FBD560BB266

const CaseStatus = () => {
  const [cnrNumber, setCnrNumber] = useState("");
  const navigate = useNavigate();
  const backendURL = import.meta.env.VITE_BACKEND_URL;
  const dispatch = useDispatch();
  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        backendURL + "/cases/searchByCnrNumber",
        { cnrNumber },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const caseData = response?.data?.data;
      dispatch(setCaseData(caseData));
      navigate("/dashboard/case-details");
    } catch (err) {
      toast.error("Invalid CNR Number");
    }
  };

  return (
    <section className="min-h-screen w-full flex flex-col items-center justify-start px-4 pt-16 pb-32">
      <div className="w-full max-w-5xl mx-auto flex flex-col items-center">
        <h1 className="text-center text-4xl font-extrabold tracking-tight text-primary mb-8">
          Case Status
        </h1>

        <div className="card w-full sm:w-2/3 md:w-1/2 bg-base-100/90 shadow-xl hover:shadow-2xl transition duration-200 rounded-2xl border border-base-200">
          <div className="card-body flex flex-col items-center text-center gap-4">
            <h2 className="card-title">Search By CNR Number</h2>

            <div className="w-full flex flex-col items-center justify-center">
              <div className="form-control w-full max-w-sm mx-auto">
                <label className="floating-label text-center">
                  <span>CNR Number</span>
                  <input
                    type="text"
                    placeholder="XXXX XXXX XXXX XXXX"
                    className="input input-bordered w-full text-center"
                    value={cnrNumber}
                    onChange={(e) => setCnrNumber(e.target.value)}
                  />
                </label>
              </div>
            </div>

            <div className="card-actions justify-center pt-2">
              <button className="btn btn-primary w-32" onClick={handleSubmit}>
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaseStatus;
