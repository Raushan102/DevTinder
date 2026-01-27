import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import feedReducer from "./FeedSlice";
import connectionRequest from "./ConnectionRequestSlice";
import connections from "./ConnectionsLayer";
import signUpSlice from "./signUpLayer";

const store = configureStore({
  reducer: {
    user: userReducer,
    feed: feedReducer,
    connectionRequests: connectionRequest,
    connections: connections,
    signUpData: signUpSlice,
  },
});

export default store;
