import { useEffect, useRef } from "react";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

function randomID(len = 5) {
  const chars =
    "12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP";
  let result = "";
  for (let i = 0; i < len; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

function getRoomID() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("roomID") || randomID(5);
}

export default function MeetingRoom() {
  const roomID = getRoomID();
  const meetingRef = useRef(null);

  useEffect(() => {
    if (!roomID) return;

    const appID = Number(import.meta.env.VITE_ZEGO_APPID);
    const serverSecret = import.meta.env.VITE_ZEGO_SERVER_SECRET;
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomID,
      randomID(5),
      randomID(5)
    );
    const zp = ZegoUIKitPrebuilt.create(kitToken);
    zp.joinRoom({
      container: meetingRef.current,
      sharedLinks: [
        {
          name: "Room ID",
          url: roomID,
        },
      ],
      scenario: {
        mode: ZegoUIKitPrebuilt.GroupCall,
      },
    });

    return () => {
      try {
        zp.destroyRoom();
      } catch {}
    };
  }, [roomID]);

  return (
    <div
      className="myCallContainer"
      ref={meetingRef}
      style={{ width: "97vw", height: "90vh" }}
    ></div>
  );
}
