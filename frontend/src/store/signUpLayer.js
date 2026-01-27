import { createSlice } from "@reduxjs/toolkit";

const signUpSlice = createSlice({
  name: "signUp",
  initialState: {},
  reducers: {
    addSignUpData: (state, action) => {
      // Append new profiles to existing feed
      return { ...action.payload };
    },
    removesignUpData: (state, action) => {
      return [];
    },
  },
});

export const { addSignUpData,removesignUpData } =
  signUpSlice.actions;
export default signUpSlice.reducer;
