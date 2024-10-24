import { createSlice } from "@reduxjs/toolkit";

const initialCounterState = {counter:0,showCounter:true}; //state 선언

//redux toolkit 사용
const counterSlice = createSlice({ 
 name:'counter', //slice이름
 initialState: initialCounterState, //초기상태
 reducers: { //메소드
    increment(state) {
        state.counter++; //return 작성없이 내부적으로 작동함
    },

    decrement(state) {
        state.counter--;
    },
    increase(state,action) {
        state.counter = state.counter + action.payload;
    },
    toggleCounter(state) {

        state.showCounter = !state.showCounter;
    }
 }

});

export const counterActions = counterSlice.actions;
export default counterSlice.reducer;