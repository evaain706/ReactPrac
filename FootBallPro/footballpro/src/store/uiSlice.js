import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useNavigate } from "react-router-dom";




const uiSlice = createSlice({
  name: "ui",
  initialState: { isOpen:false ,isFavOpen:false },
  reducers: {
    openModal(state) {
     state.isOpen = !state.isOpen;
    },
    closeModal(state) {
        state.isOpen = !state.isOpen;
       },

     openFav(state){
      state.isFavOpen = !state.isFavOpen;

     },
     
     closeFav(state){
      state.isFavOpen = !state.isFavOpen;

     }
 
  },
});







export const uiActions = uiSlice.actions;

export default uiSlice.reducer;
