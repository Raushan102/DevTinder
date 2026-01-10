import { createSlice } from "@reduxjs/toolkit";

const connectionRequestSlice = createSlice({
  name: 'connectionRequest',
  initialState: [],
  reducers: {
    addConnectionRequest: (state, action) => {
      // Append new profiles to existing feed
      return action.payload;
    },
    removeConnectionRequests: (state, action) => {
      return [];
    },
    removeConnectionRequest: (state, action) => {
      return state.filter(profile => profile._id !== action.payload);
    }
  }
});

export const { addConnectionRequest, removeConnectionRequests, removeConnectionRequest } = connectionRequestSlice.actions;
export default connectionRequestSlice.reducer;
