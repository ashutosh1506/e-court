import { Link, Outlet } from "react-router-dom";

const Dashboard = () => {
  const closeDrawer = () => {
    const el = document.getElementById("my-drawer-4");
    if (el && "checked" in el) {
      el.checked = false;
    }
  };
  return (
    <>
      <div className="w-full bg-base-100 backdrop-blur-md border border-base-300/40 rounded-md shadow-lg flex items-center justify-between relative px-4 py-2">
        {/* Centered Heading */}
        <h1 className="absolute left-1/2 transform -translate-x-1/2 text-xl md:text-3xl font-bold text-base-content tracking-wide drop-shadow-sm">
          Dashboard
        </h1>

        {/* Drawer Icon (label toggles drawer below) */}
        <label htmlFor="my-drawer-4" className="drawer-button">
          <img
            src="https://img.icons8.com/?size=100&id=q25UylAybCCR&format=png&color=000000"
            alt="open menu"
            className="m-2 w-8 cursor-pointer"
          />
        </label>
      </div>

      {/* Drawer lives outside the blurred header to avoid stacking context issues */}
      <div className="drawer drawer-end z-[9999]">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content" />
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-4"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4 space-y-2">
            <li>
              <Link
                to="profile"
                onClick={closeDrawer}
                className="flex items-center gap-3 rounded-lg px-4 py-2 font-medium transition-all duration-300 hover:bg-primary hover:text-white hover:scale-105 shadow-sm"
              >
                Profile
              </Link>
            </li>
            <li>
              <Link
                to="register-case"
                onClick={closeDrawer}
                className="flex items-center gap-3 rounded-lg px-4 py-2 font-medium transition-all duration-300 hover:bg-primary hover:text-white hover:scale-105 shadow-sm"
              >
                New Case
              </Link>
            </li>
            <li>
              <Link
                to="case-status"
                onClick={closeDrawer}
                className="flex items-center gap-3 rounded-lg px-4 py-2 font-medium transition-all duration-300 hover:bg-primary hover:text-white hover:scale-105 shadow-sm"
              >
                Case Status
              </Link>
            </li>
            <li>
              <button
                className="flex items-center gap-3 rounded-lg px-4 py-2 font-medium transition-all duration-300 hover:bg-primary hover:text-white hover:scale-105 shadow-sm"
                onClick={() => {
                  closeDrawer();
                  document.getElementById("my_modal_3").showModal();
                }}
              >
                Video Conference
              </button>
            </li>
            <li>
              <Link
                to="lawyer-stats"
                onClick={closeDrawer}
                className="flex items-center gap-3 rounded-lg px-4 py-2 font-medium transition-all duration-300 hover:bg-primary hover:text-white hover:scale-105 shadow-sm"
              >
                Stats
              </Link>
            </li>
            <li>
              <Link
                to="find-lawyer"
                onClick={closeDrawer}
                className="flex items-center gap-3 rounded-lg px-4 py-2 font-medium transition-all duration-300 hover:bg-primary hover:text-white hover:scale-105 shadow-sm"
              >
                Find Lawyer
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Child pages render here */}
      <div className="p-6">
        <Outlet />
      </div>

      {/* Modal */}
      <dialog id="my_modal_3" className="modal modal-middle">
        <div className="modal-box">
          <form method="dialog">
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
