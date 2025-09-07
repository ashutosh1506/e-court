import { useSelector } from "react-redux";

const Profile = () => {
  const { user } = useSelector((state) => state.user);
  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-base-100/90  p-10 -mt-10">
      <div className="flex flex-col lg:flex-row items-center lg:items-stretch justify-center gap-x-20">
        {/* Left: Profile Card */}
        <div className="flex flex-col bg-base-100 shadow-xl rounded-xl w-full lg:w-1/2 max-w-md h-full hover:shadow-2xl transition duration-200 mb-10 lg:mb-0">
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
              <div className="grid grid-cols-2 gap-y-3 gap-x-6 text-base-content">
                <p className="font-semibold">Name:</p>
                <p className="text-right">John Cena</p>
                <p className="font-semibold">Gender:</p>
                <p className="text-right">Male</p>
                <p className="font-semibold">DOB:</p>
                <p className="text-right">17-08-2004</p>
                <p className="font-semibold">Mail:</p>
                <p className="text-right">john@gmail.com</p>
                <p className="font-semibold">Contact No.:</p>
                <p className="text-right">9213782973</p>
                {user === "lawyer" && (
                  <p className="font-semibold">Bar Association No.:</p>
                )}
                {user === "lawyer" && (
                  <p className="text-right">MP/1234/6789</p>
                )}
                <p className="font-semibold">State:</p>
                <p className="text-right">Punjab</p>
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
                  placeholder="Enter your name"
                  className="input input-bordered w-full"
                  defaultValue="John Cena"
                />
              </div>

              <div className="form-control">
                <label className="label font-semibold">Gender</label>
                <select className="select select-bordered w-full">
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>

              <div className="form-control">
                <label className="label font-semibold">Date of Birth</label>
                <input
                  type="date"
                  className="input input-bordered w-full"
                  defaultValue="2004-08-17"
                />
              </div>

              {user === "lawyer" && (
                <div className="form-control">
                  <label className="label font-semibold">
                    Bar Association No.
                  </label>
                  <input
                    type="text"
                    className="input input-bordered w-full"
                    defaultValue="MP/1234/6789"
                  />
                </div>
              )}

              <div className="form-control">
                <label className="label font-semibold">State</label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  defaultValue="Punjab"
                />
              </div>

              <div className="form-control mt-6">
                <button className="btn btn-primary w-full">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
