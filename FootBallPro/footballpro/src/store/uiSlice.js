import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useNavigate } from "react-router-dom";




const uiSlice = createSlice({
  name: "ui",
  initialState: { isOpen:false },
  reducers: {
    openModal(state) {
     state.isOpen = !state.isOpen;
    },
    closeModal(state) {
        state.isOpen = !state.isOpen;
       },
 
  },
});







export const uiActions = uiSlice.actions;

export default uiSlice.reducer;
