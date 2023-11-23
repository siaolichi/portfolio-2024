import { configureStore } from "@reduxjs/toolkit";
import pagesReducer from "./features/pages";

export default configureStore({
  reducer: {
    pages: pagesReducer,
  },
});
