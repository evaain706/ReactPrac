import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const apiToken = process.env.REACT_APP_API_TOKEN




const apiSlice = createSlice({
  name: "football",
  initialState: { videos: [], filteredVideos: [], isNew: false, title:null },
  reducers: {
    getVideo(state, action) {
      state.videos = action.payload;
      state.filteredVideos = action.payload; 
    },
    searchVideo(state, action) {
      const filtered = state.videos.filter((video) =>
        video.title.toLowerCase().includes(action.payload.toLowerCase())
      );
      state.filteredVideos = filtered.length > 0 ? filtered : [];
    },
    setTitle(state,action) {
      state.title = action.payload;
    }
  },
});

export const getVideo = () => {
  return async (dispatch, getState) => {
    const { videos } = getState().football;

   
    if (videos.length > 0) return;

    try {
      const response = await axios.get(
        `https://www.scorebat.com/video-api/v3/feed/?token=${apiToken}`
      );
      const videos = response.data.response;
      console.log('요청함');
      dispatch(apiActions.getVideo(videos));
    } catch (error) {
      console.log("에러발생", error);
    }
  };
};





export const apiActions = apiSlice.actions;

export default apiSlice.reducer;
