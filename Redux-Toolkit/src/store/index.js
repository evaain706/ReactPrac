import { legacy_createStore as createStore } from 'redux';
import { createSlice,configureStore } from '@reduxjs/toolkit';

import counterReducer from './counter-slice';
import authReducer from './auth-slice';


const store = configureStore({
   reducer:{counter: counterReducer,auth: authReducer},   // reducer: counterSlice.reducer  reducer:{counter:counterSlice.reducer
}); //객체형식으로 여러 reducer를 병합가능


export default store;


