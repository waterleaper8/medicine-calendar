import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  morning: false,
  day: false,
  night: false,
};

export const checkedTimesSlice = createSlice({
  name: "checkedTimes",
  initialState,
  reducers: {
    morning: (state) => {
      state.morning = !state.morning;
    },
    day: (state) => {
      state.day = !state.day;
    },
    night: (state) => {
      state.night = !state.night;
    },
    setdb: (state, action) => {
      state = action.payload;
    },
  },
});

export const { morning, day, night, setdb } = checkedTimesSlice.actions;

export const checkedTimes = (state) => state.checkedTimes;

export default checkedTimesSlice.reducer;
