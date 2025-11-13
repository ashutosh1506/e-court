import React, { useState } from "react";
import axios from "axios";

const RegisterNewCase = () => {
  const [form, setForm] = useState({
    courtName: "",
    caseType: "",
    caseTitle: "",
    petitionerName: "",
    petitionerAddress: "",
    petitionerContact: "",
    petitionerAadharNumber: "",
    advocateName: "",
    advocateBarRegNo: "",
    advocateContact: "",
  });

  const [loading, setLoading] = useState(false);
  const [cnrNumber, setCnrNumber] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Handle input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    setCnrNumber(null);

    try {
      // Send JSON since no file upload is required
      const payload = { ...form };

      // API call — adjust your endpoint
      const res = await axios.post(
        "http://localhost:5000/api/cases/register",
        payload
      );

      if (res.data?.cnrNumber) {
        setCnrNumber(res.data.cnrNumber);
        setShowPopup(true);
      } else {
        throw new Error("CNR number not received from backend");
      }

      // Reset form fields
      setForm({
        courtName: "",
        caseType: "",
        caseTitle: "",
        petitionerName: "",
        petitionerAddress: "",
        petitionerContact: "",
        petitionerAadharNumber: "",
        advocateName: "",
        advocateBarRegNo: "",
        advocateContact: "",
      });
    } catch (err) {
      console.error("Error:", err);
      setErrorMsg("❌ Failed to register case. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-100 flex items-center justify-center py-10 -mt-12 px-4">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-6 space-y-2">
          <h1 className="text-4xl font-extrabold tracking-tight text-primary">
            Register New Case
          </h1>
          <p className="text-base-content/70">
            Fill the details to create a case
          </p>
        </div>

        <div className="card bg-base-100/90 shadow-xl hover:shadow-2xl transition duration-200">
          <div className="card-body">
            <h2 className="card-title justify-center">Case Form</h2>

            <form className="space-y-5" onSubmit={handleSubmit}>
              {/* Court Name */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">
                    Name of the Court
                  </span>
                </label>
                <select
                  name="courtName"
                  className="select select-bordered w-full"
                  value={form.courtName}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>
                    Select Court
                  </option>
                  <option value="district">District Court</option>
                  <option value="high">High Court</option>
                  <option value="supreme">Supreme Court</option>
                </select>
              </div>

              {/* Case Type */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Type of Case</span>
                </label>
                <select
                  name="caseType"
                  className="select select-bordered w-full"
                  value={form.caseType}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>
                    Choose a type
                  </option>
                  <option value="civil">Civil</option>
                  <option value="criminal">Criminal</option>
                  <option value="constitutional">Constitutional</option>
                </select>
              </div>

              {/* Short Case Title */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">
                    Short Case Title
                  </span>
                </label>
                <input
                  type="text"
                  name="caseTitle"
                  placeholder="e.g. Ram v. State — Land Dispute"
                  className="input input-bordered w-full"
                  value={form.caseTitle}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Petitioner Details */}
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-3">
                  Petitioner(s) / Plaintiff(s)
                </h3>

                <div className="form-control">
                  <label className="label">Full Name</label>
                  <input
                    type="text"
                    name="petitionerName"
                    placeholder="Full Name"
                    className="input input-bordered w-full"
                    value={form.petitionerName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-control mt-3">
                  <label className="label">Address</label>
                  <textarea
                    name="petitionerAddress"
                    placeholder="Full Address"
                    className="textarea textarea-bordered w-full"
                    value={form.petitionerAddress}
                    onChange={handleChange}
                    rows={3}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3 mt-3">
                  <div className="form-control">
                    <label className="label">Contact Number</label>
                    <input
                      type="tel"
                      name="petitionerContact"
                      placeholder="Phone"
                      className="input input-bordered w-full"
                      value={form.petitionerContact}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-control">
                    <label className="label">Aadhar Number</label>
                    <input
                      type="text"
                      name="petitionerAadharNumber"
                      placeholder="XXXX-XXXX-XXXX"
                      className="input input-bordered w-full"
                      value={form.petitionerAadharNumber}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Advocate Details */}
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold mb-3">Advocate Details</h3>
                <div className="form-control">
                  <label className="label">Advocate Name</label>
                  <input
                    type="text"
                    name="advocateName"
                    placeholder="Advocate Full Name"
                    className="input input-bordered w-full"
                    value={form.advocateName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3 mt-3">
                  <div className="form-control">
                    <label className="label">Bar Council Reg. No.</label>
                    <input
                      type="text"
                      name="advocateBarRegNo"
                      placeholder="Registration Number"
                      className="input input-bordered w-full"
                      value={form.advocateBarRegNo}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-control">
                    <label className="label">Contact Number</label>
                    <input
                      type="tel"
                      name="advocateContact"
                      placeholder="Phone"
                      className="input input-bordered w-full"
                      value={form.advocateContact}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className="grid grid-cols-2 gap-3 pt-3">
                <button
                  type="reset"
                  className="btn btn-secondary"
                  onClick={() => {
                    setForm({
                      courtName: "",
                      caseType: "",
                      caseTitle: "",
                      petitionerName: "",
                      petitionerAddress: "",
                      petitionerContact: "",
                      petitionerAadharNumber: "",
                      advocateName: "",
                      advocateBarRegNo: "",
                      advocateContact: "",
                    });
                  }}
                >
                  Reset
                </button>
                <button
                  type="submit"
                  className={`btn btn-primary ${loading ? "loading" : ""}`}
                  disabled={loading}
                >
                  {loading ? "Submitting..." : "Submit"}
                </button>
              </div>
            </form>

            {/* Error message */}
            {errorMsg && (
              <p className="text-center mt-4 text-red-500 font-medium text-sm">
                {errorMsg}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Success popup modal */}
      {showPopup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl p-8 w-[90%] max-w-md text-center animate-fade-in">
            <h2 className="text-2xl font-bold text-green-600 mb-3">
              Case Registered Successfully!
            </h2>
            <p className="text-base-content/70 mb-4">
              Your case has been successfully registered.
            </p>
            <div className="bg-green-100 text-green-800 font-semibold py-3 rounded-lg mb-6">
              CNR Number: <span className="text-primary">{cnrNumber}</span>
            </div>
            <button
              className="btn btn-primary w-full"
              onClick={() => setShowPopup(false)}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegisterNewCase;
