import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";

function randomID(len = 7) {
  const chars =
    "12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP";
  let result = "";
  for (let i = 0; i < len; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

const Dashboard = () => {
  const { user, isLoggedIn } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [roomID, setRoomID] = useState("");

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/", { replace: true });
    }
  }, [isLoggedIn, navigate]);

  const closeDrawer = () => {
    const el = document.getElementById("my-drawer-4");
    if (el && "checked" in el) {
      el.checked = false;
    }
  };

  const closeModal = () => {
    const dlg = document.getElementById("my_modal_3");
    if (dlg && typeof dlg.close === "function") {
      dlg.close();
    } else {
      dlg?.removeAttribute("open");
    }
  };

  const handleJoinMeeting = () => {
    if (roomID.trim()) {
      closeModal();
      navigate(`/dashboard/meeting-room?roomID=${roomID.trim()}`);
    } else {
      alert("Please enter a Meeting ID to join.");
    }
  };

  const handleStartMeeting = () => {
    closeModal();
    navigate(`/dashboard/meeting-room?roomID=${randomID()}`);
  };

  if (!isLoggedIn) return null;

  return (
    <div>
      <div className="w-full bg-base-100 backdrop-blur-md border border-base-300/40 rounded-md shadow-lg flex items-center justify-between relative px-4 py-2 ">
        <h1 className="absolute left-1/2 transform -translate-x-1/2 text-xl md:text-3xl font-bold text-base-content tracking-wide drop-shadow-sm">
          Dashboard
        </h1>

        <label htmlFor="my-drawer-4" className="drawer-button">
          <img
            src="https://img.icons8.com/?size=100&id=q25UylAybCCR&format=png&color=000000"
            alt="open menu"
            className="m-2 w-8 cursor-pointer"
          />
        </label>
      </div>

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
            {user === "lawyer" && (
              <li>
                <Link
                  to="register-case"
                  onClick={closeDrawer}
                  className="flex items-center gap-3 rounded-lg px-4 py-2 font-medium transition-all duration-300 hover:bg-primary hover:text-white hover:scale-105 shadow-sm"
                >
                  New Case
                </Link>
              </li>
            )}
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
            {user === "lawyer" && (
              <li>
                <Link
                  to="lawyer-stats"
                  onClick={closeDrawer}
                  className="flex items-center gap-3 rounded-lg px-4 py-2 font-medium transition-all duration-300 hover:bg-primary hover:text-white hover:scale-105 shadow-sm"
                >
                  Stats
                </Link>
              </li>
            )}
            {user === "client" && (
              <li>
                <Link
                  to="find-lawyer"
                  onClick={closeDrawer}
                  className="flex items-center gap-3 rounded-lg px-4 py-2 font-medium transition-all duration-300 hover:bg-primary hover:text-white hover:scale-105 shadow-sm"
                >
                  Find Lawyer
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>

      <div className="p-6">
        <Outlet />
      </div>

      {/* Video Conference Modal */}
      <dialog id="my_modal_3" className="modal modal-middle">
        <div className="modal-box">
          <form method="dialog">
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              type="button"
              onClick={closeModal}
            >
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg text-center">Hello!</h3>
          <p className="py-4 text-center">
            To join your online video conferencing, enter the Meeting ID below
            or start a new meeting.
          </p>
          <input
            type="text"
            className="input input-bordered w-full mt-3"
            placeholder="Enter Meeting ID"
            value={roomID}
            onChange={(e) => setRoomID(e.target.value)}
          />
          <button
            className="btn btn-primary block mx-auto mt-5 pt-2"
            type="button"
            onClick={handleJoinMeeting}
          >
            Join Hearing
          </button>
          <button
            className="btn btn-secondary block mx-auto mt-2 pt-2"
            type="button"
            onClick={handleStartMeeting}
          >
            Start Hearing
          </button>
        </div>
      </dialog>
    </div>
  );
};

export default Dashboard;
