import { createSlice } from "@reduxjs/toolkit";

const FeedSlice = createSlice({
  name: 'feed',
  initialState: [],
  reducers: {
    addFeed: (state, action) => {
      // Append new profiles to existing feed
      return [...state, ...action.payload];
    },
    removeFeed: (state, action) => {
      return [];
    },
    removeUserFromFeed: (state, action) => {
      return state.filter(profile => profile._id !== action.payload);
    }
  }
});

export const { addFeed, removeFeed, removeUserFromFeed } = FeedSlice.actions;
export default FeedSlice.reducer;
