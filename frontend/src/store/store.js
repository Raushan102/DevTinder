import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import feedReducer from './FeedSlice';
import connectionRequest from './ConnectionRequestSlice'

const store = configureStore({
  reducer: {
    user: userReducer,
    feed: feedReducer,
    connectionRequests:connectionRequest
  },
});

export default store;
