import { configureStore } from "@reduxjs/toolkit";
import apiReducer from './apiSlice'


const store = configureStore({

     reducer:{football :apiReducer,}

});


export default store;
