import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  caseData: null,
};

const caseSlice = createSlice({
  name: "case",
  initialState,
  reducers: {
    setCaseData(state, action) {
      state.caseData = action.payload;
    },
    clearCaseData(state) {
      state.caseData = null;
    },
  },
});

export const { setCaseData, clearCaseData } = caseSlice.actions;

export default caseSlice.reducer;
