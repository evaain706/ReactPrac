import { configureStore } from "@reduxjs/toolkit";

import uiSlice from './ui-slice'

import uiReducer from './ui-slice'

import cartReducer from './mycart-slice'



const store = configureStore({
    reducer:{ui:uiReducer , cart:cartReducer},
});



export default store;

