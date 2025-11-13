import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import caseReducer from "./caseSlice";

const appStore = configureStore({
  reducer: {
    user: userReducer,
    case: caseReducer,
  },
});

export default appStore;
