import { createSlice } from "@reduxjs/toolkit";




const initialAuthState = {
    isAuth:false
};

const authSlice = createSlice({
 name:'auth',
 initialState: initialAuthState,
 reducers:{
    login(state) {
        state.isAuth = true;
        console.log(state.isAuth);
    },

    logout(state) {
        state.isAuth = false;
        console.log(state.isAuth);
    }
 }

})
export const authActions = authSlice.actions;
export default authSlice.reducer;
