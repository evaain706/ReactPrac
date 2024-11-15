import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";


//ui관련 slice

const uiSlice = createSlice({
  name: "ui",
  initialState: { isOpen:false ,isFavOpen:false,isPublicModalOpen:false,publicModalContent:null} ,
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

     },

     publicModalOpen(state, action) {
      state.isPublicModalOpen = !state.isPublicModalOpen;
      state.publicModalContent = action.payload;  
    },


  
  },
});






export const uiActions = uiSlice.actions;

export default uiSlice.reducer;
