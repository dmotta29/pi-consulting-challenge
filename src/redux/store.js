import { configureStore } from "@reduxjs/toolkit";
import charactersList from "./charactersSlice";

export default configureStore({
  reducer: {
    charactersList: charactersList,
  },
});
