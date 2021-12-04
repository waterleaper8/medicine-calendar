import { configureStore } from "@reduxjs/toolkit";
import checkedTimesReducer from "../checkedTimes/checkedTimesSlice";

export const store = configureStore({
  reducer: {
    checkedTimes: checkedTimesReducer,
  },
});
