import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";


//firebase 사용
const FIREBASE_URL = process.env.REACT_APP_FIREBASE_URL;

//팀별 게시판 관련 slice
const commuSlice = createSlice({
  name: "commu",
  initialState: {
    selectedTeamId: null,
    postsByTeam: {}, //팀별 게시물 구분용
    status: "idle",
    error: null,
    teamName: null
  },
  reducers: {

    setTeamName(state,action){

        state.teamName = action.payload;
    },

    setTeamId(state, action) {
      state.selectedTeamId = action.payload;
    },
    setPosts(state, action) {
      const { teamId, posts } = action.payload;
      state.postsByTeam[teamId] = posts;
    },
    addPost(state, action) {
      const { teamId, post } = action.payload;
      if (!state.postsByTeam[teamId]) {
        state.postsByTeam[teamId] = [];
      }
      state.postsByTeam[teamId].push(post);
    },
    deletePost(state, action) {
        const { teamId, postId } = action.payload;
       
        state.postsByTeam[teamId] = state.postsByTeam[teamId].filter(
          (post) => post.id !== postId
        );
      },
      likePost(state, action) {
        const { teamId, postId, like } = action.payload;
        const post = state.postsByTeam[teamId]?.find((post) => post.id === postId);
        if (post) {
          post.like = like;
        }
      },
    setStatus(state, action) {
      state.status = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});



//비동기 통신

//팀별 게시글 받아오기
export const fetchPosts = (teamId) => async (dispatch) => {
    dispatch(commuActions.setStatus("loading"));
    try {   
      const response = await axios.get(`${FIREBASE_URL}/posts/${teamId}.json`);
      const posts = response.data
        ? Object.entries(response.data).map(([id, data]) => ({ id, ...data }))
        : [];
      dispatch(commuActions.setPosts({ teamId, posts }));
      dispatch(commuActions.setStatus("성공"));
      console.log('불러오기 성공')
    } catch (error) {
      dispatch(commuActions.setError(error.message));
      dispatch(commuActions.setStatus("실패"));
    }
  };
  
  //게시글 업로드
  export const createPost = ({ teamId, post }) => async (dispatch) => {
    try {
      const response = await axios.post(
        `${FIREBASE_URL}/posts/${teamId}.json`,
        post
      );
      const postId = response.data.name;
      dispatch(commuActions.addPost({ teamId, post: { id: postId, ...post } }));
    } catch (error) {
      dispatch(commuActions.setError(error.message));
    }
  };

  //게시글 지우기
  export const deletePost = ({ teamId, postId }) => async (dispatch) => {
    try {
    
      await axios.delete(`${FIREBASE_URL}/posts/${teamId}/${postId}.json`);
  
    
      dispatch(commuActions.deletePost({ teamId, postId }));
    } catch (error) {
      dispatch(commuActions.setError(error.message));
    }
  };

  //게시글 좋아요

  export const likePost = ({ teamId, postId }) => async (dispatch, getState) => {
    try {
      const state = getState();
    
      const currentLikes =
        state.commu.postsByTeam[teamId]?.find((post) => post.id === postId)?.like || 0;
   
      const newLikes = currentLikes + 1;
  
      await axios.patch(`${FIREBASE_URL}/posts/${teamId}/${postId}.json`, {
        like: newLikes,
      });
  
     
      dispatch(
        commuActions.likePost({
          teamId,
          postId,
          like: newLikes,
        })
      );
    } catch (error) {
      dispatch(commuActions.setError(error.message));
    }
  };
  


  

export const commuActions = commuSlice.actions;
export default commuSlice.reducer;
