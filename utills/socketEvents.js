import Cookies from "js-cookie";
import { ACCESS_TOKEN } from "./globalVars";
import { io } from "socket.io-client";
import { setGlobalSocketConnection } from "store/global/globalReducer";
const url = "https://api.synkli.dev";
console.log({ url }, process.env.REACT_APP_SOCKET_URL);
const socketEvents = () => {};

export const handleConnection = (events, category) => {
  const access_token = localStorage.getItem(ACCESS_TOKEN);
  const socket = io(url, {
    query: {
      access_token: access_token,
      category,
      event_ids: events,
    },
  });
};

export const connectSocket = (
  category,
  requestedEvents,
  userType,
  userEmail
) => {
  const access_token = localStorage.getItem("access_token");
  const eventsIds = requestedEvents?.length > 0 && requestedEvents.join("!"); //condionally
  const queryObject = {
    category: category,
    event_ids: eventsIds ? eventsIds : "", //condionally
    access_token: "",
    ...(userType ? { user_type: userType } : {}), //condionally
    ...(userEmail ? { email: userEmail } : {}), //condionally
  };
  return io(url, { query: queryObject });
};

export const disconnectSocket = (socket) => {
  socket?.disconnect();
};

export function startHeartbeatInterval(dispatch, connection) {
  const heartbeatInterval = setInterval(() => {
    if (connection) {
      connection.emit("heartbeat", "");
      console.log("sending heart beat", connection.id);
    }
  }, 3000);
  dispatch(setGlobalSocketConnection(heartbeatInterval));
}

export function stopHeartbeatInterval(dispatch, intervalId) {
  clearInterval(intervalId, "intervalknnfnjdnjfndjnfjd");
  console.log("end", intervalId);
  dispatch(setGlobalSocketConnection(null));
}
