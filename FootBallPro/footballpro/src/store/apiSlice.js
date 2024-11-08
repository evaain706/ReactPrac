import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const apiSlice = createSlice({
  name: "football",
  initialState: { videos: [], filteredVideos: [], isNew: false },
  reducers: {
    getVideo(state, action) {
      state.videos = action.payload;
      state.filteredVideos = action.payload; 
    },
    searchVideo(state, action) {
        state.filteredVideos = state.videos.filter((video) =>
          video.title.toLowerCase().includes(action.payload.toLowerCase())
        );
      },
  },
});

export const getVideo = () => {
  return async (dispatch, getState) => {
    const { videos } = getState().football;

   
    if (videos.length > 0) return;

    try {
      const response = await axios.get(
        "https://www.scorebat.com/video-api/v3/feed/?token=MTg0NzAwXzE3MzA3ODU3ODZfMjRlYjI4OTQ0NDYwZmJlN2I0NTkyYzA2YmZmYTM2MjYyZmRjN2ZiZg=="
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
