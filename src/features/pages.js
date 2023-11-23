import { createSlice } from "@reduxjs/toolkit";

export const pagesSlice = createSlice({
  name: "pages",
  initialState: {
    currentPage: "home",
  },
  reducers: {
    setPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setPage } = pagesSlice.actions;

export default pagesSlice.reducer;
