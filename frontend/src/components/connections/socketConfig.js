// import io from "socket.io-client";
// import { BASE_URL } from "../util/constent";

// export const createSocketConnection = () => {
//   return io(BASE_URL, {
//     transports: ["websocket", "polling"] // Fallback mechanism
//   });
// };


// while deployment

import io from "socket.io-client";

export const createSocketConnection = () => {
  return io("https://raushankumarsaw.in", {  // ⬅️ CHANGE: Not /api, just root domain
    withCredentials: true,
    transports: ["websocket", "polling"]
  });
};

