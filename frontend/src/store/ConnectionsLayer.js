import { createSlice } from "@reduxjs/toolkit";

const connections = createSlice({
  name: 'connections',
  initialState: [],
  reducers: {
    addConnections: (state, action) => {
      // Append new profiles to existing feed
      return [...action.payload];
    },
    removeConnections: (state, action) => {
      return [];
    },
    removeConnection: (state, action) => {
      return state.filter(profile => profile._id !== action.payload);
    }
  }
});

export const { addConnections, removeConnections, removeConnection } = connections.actions;
export default connections.reducer;
