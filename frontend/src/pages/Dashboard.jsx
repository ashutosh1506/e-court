const Dashboard = () => {
  return (
    <>
      <div className="w-full bg-base-100 backdrop-blur-md border border-base-300/40 rounded-md shadow-lg flex items-center justify-between relative px-4 py-2">
        {/* Centered Heading */}
        <h1 className="absolute left-1/2 transform -translate-x-1/2 text-3xl font-bold text-base-content tracking-wide drop-shadow-sm">
          Lawyer Dashboard
        </h1>

        {/* Drawer Icon */}
        <div className="drawer drawer-end ">
          <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content">
            <label htmlFor="my-drawer-4" className="drawer-button">
              <img
                src="https://img.icons8.com/?size=100&id=q25UylAybCCR&format=png&color=000000"
                alt=""
                className="m-2 w-8 cursor-pointer"
              />
            </label>
          </div>
          <div className="drawer-side">
            <label
              htmlFor="my-drawer-4"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4  space-y-2">
              <li>
                <a className="flex items-center gap-3 rounded-lg px-4 py-2 font-medium transition-all duration-300 hover:bg-primary hover:text-white hover:scale-105 shadow-sm">
                  Profile
                </a>
              </li>
              <li>
                <a className="flex items-center gap-3 rounded-lg px-4 py-2 font-medium transition-all duration-300 hover:bg-primary hover:text-white hover:scale-105 shadow-sm">
                  New Case
                </a>
              </li>
              <li>
                <a className="flex items-center gap-3 rounded-lg px-4 py-2 font-medium transition-all duration-300 hover:bg-primary hover:text-white hover:scale-105 shadow-sm">
                  Case Status
                </a>
              </li>
              <li>
                <button
                  className="flex items-center gap-3 rounded-lg px-4 py-2 font-medium transition-all duration-300 hover:bg-primary hover:text-white hover:scale-105 shadow-sm"
                  onClick={() =>
                    document.getElementById("my_modal_3").showModal()
                  }
                >
                  Video Conference
                </button>
              </li>
              <li>
                <a className="flex items-center gap-3 rounded-lg px-4 py-2 font-medium transition-all duration-300 hover:bg-primary hover:text-white hover:scale-105 shadow-sm">
                  Total Cases
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* Place modal at root level (outside any transformed/filtered parent) to ensure viewport centering */}
      <dialog id="my_modal_3" className="modal modal-middle">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">
            To join your online video conferencing hearing click the button
            below
          </p>
          <p>You will require to provide your:</p>
          <p>1. Name</p>
          <p>2. Room Password</p>
          <p>3. Your FaceID</p>
          <button className="btn btn-primary block mx-auto mt-6">
            Join Hearing
          </button>
        </div>
      </dialog>
    </>
  );
};

export default Dashboard;
