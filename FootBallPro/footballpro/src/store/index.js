import { configureStore } from "@reduxjs/toolkit";
import apiReducer from './apiSlice'
import uiReducer from './uiSlice'
import favReducer from './FavSlice'


const store = configureStore({

     reducer:{football :apiReducer, ui : uiReducer , fav:favReducer}

});


export default store;
