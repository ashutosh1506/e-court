const RegisterNewCase = () => {
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

        {/* Card container */}
        <div className="card bg-base-100/90 shadow-xl hover:shadow-2xl transition duration-200">
          <div className="card-body">
            <h2 className="card-title justify-center">Case Form</h2>

            <form className="space-y-5">
              {/* District */}
              <div className="form-control">
                <label htmlFor="district" className="label">
                  <span className="label-text font-medium">District</span>
                </label>
                <input
                  id="district"
                  type="text"
                  placeholder="Enter district"
                  className="input input-bordered w-full mt-2"
                />
              </div>

              {/* Court Level */}
              <fieldset className="form-control">
                <legend className="label p-0 mb-2">
                  <span className="label-text font-medium">Court Level</span>
                </legend>
                <div className="flex flex-wrap gap-4">
                  <label className="label cursor-pointer gap-2">
                    <input
                      type="radio"
                      name="courtLevel"
                      className="radio radio-secondary"
                      defaultChecked
                      value="district"
                    />
                    <span className="label-text">District Court</span>
                  </label>
                  <label className="label cursor-pointer gap-2">
                    <input
                      type="radio"
                      name="courtLevel"
                      className="radio radio-secondary"
                      value="high"
                    />
                    <span className="label-text">High Court</span>
                  </label>
                </div>
              </fieldset>

              {/* Matter Urgency */}
              <fieldset className="form-control">
                <legend className="label p-0 mb-2">
                  <span className="label-text font-medium">Matter Urgency</span>
                </legend>
                <div className="flex flex-wrap gap-4">
                  <label className="label cursor-pointer gap-2">
                    <input
                      type="radio"
                      name="urgency"
                      className="radio radio-secondary"
                      value="urgent"
                    />
                    <span className="label-text">Urgent</span>
                  </label>
                  <label className="label cursor-pointer gap-2">
                    <input
                      type="radio"
                      name="urgency"
                      className="radio radio-secondary"
                      value="ordinary"
                      defaultChecked
                    />
                    <span className="label-text">Ordinary</span>
                  </label>
                </div>
              </fieldset>

              {/* Matter Category */}
              <div className="form-control">
                <label htmlFor="category" className="label">
                  <span className="label-text font-medium">
                    Matter Category
                  </span>
                </label>
                <select
                  id="category"
                  className="select select-bordered w-full mt-2"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Choose a category
                  </option>
                  <option value="civil">Civil</option>
                  <option value="criminal">Criminal</option>
                  <option value="marital">Marital</option>
                </select>
              </div>

              {/* MACT Matter */}
              <fieldset className="form-control">
                <legend className="label p-0 mb-2">
                  <span className="label-text font-medium">
                    Is MACT matter?
                  </span>
                </legend>
                <div className="flex flex-wrap gap-4">
                  <label className="label cursor-pointer gap-2">
                    <input
                      type="radio"
                      name="isMACT"
                      className="radio radio-secondary"
                      value="yes"
                    />
                    <span className="label-text">Yes</span>
                  </label>
                  <label className="label cursor-pointer gap-2">
                    <input
                      type="radio"
                      name="isMACT"
                      className="radio radio-secondary"
                      value="no"
                      defaultChecked
                    />
                    <span className="label-text">No</span>
                  </label>
                </div>
              </fieldset>

              {/* Actions */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <button type="reset" className="btn btn-secondary">
                  Reset
                </button>
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterNewCase;
