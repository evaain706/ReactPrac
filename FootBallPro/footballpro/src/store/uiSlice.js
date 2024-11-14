import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";




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

// export const getVideo = () => {
//   return async (dispatch, getState) => {
//     const { videos } = getState().football;

   
//     if (videos.length > 0) return;

//     try {
//       const response = await axios.get(
//         `https://www.scorebat.com/video-api/v3/feed/?token=${apiToken}`
//       );
//       const videos = response.data.response;
//       console.log('요청함');
//       dispatch(apiActions.getVideo(videos));
//     } catch (error) {
//       console.log("에러발생", error);
//     }
//   };
// };










export const uiActions = uiSlice.actions;

export default uiSlice.reducer;
