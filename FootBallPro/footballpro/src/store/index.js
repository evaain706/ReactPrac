import { configureStore } from "@reduxjs/toolkit";
import apiReducer from './apiSlice'
import uiReducer from './uiSlice'
import favReducer from './FavSlice'
import CommuReducer from './CommuSlice'


const store = configureStore({

     reducer:{football :apiReducer, ui : uiReducer , fav:favReducer , commu:CommuReducer}

});


export default store;
