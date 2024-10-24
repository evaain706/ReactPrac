import { legacy_createStore as createStore } from 'redux';
import { createSlice,configureStore } from '@reduxjs/toolkit';


const initialState = {counter:0,showCounter:true}; //state 선언

//redux toolkit 사용
const counterSlice = createSlice({ 
 name:'counter', //slice이름
 initialState: {counter:0,showCounter:true}, //초기상태
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

//redux사용
// const counterReducer = (state = initialState ,action) => {

//     if(action.type === 'increment'){
//         return{
//             counter:state.counter +1,  //initialstate에 counter, showCounter 두개의 상태가 존재하므로 둘중 하나가 변하지 않더라도 return은 모두해줘야함
//             showCounter:state.showCounter  //즉,reducer에서 상태를 업데이트할 때 모든 상태를 포함한 객체를 반환해야함
//         }
//     }

//     if(action.type === 'increase'){
//         return{
//             counter:state.counter + action.amount,
//             showCounter:state.showCounter,
//         }
//     }


//     if(action.type === 'decrement'){
//         return{
//             counter: state.counter -1,
//             showCounter:state.showCounter,
//         }
//     }

//     if(action.type === 'toggle'){
//         return{
//             showCounter: !state.showCounter,
//             counter:state.counter,
//         }
//     }
//     return state;
// };




const store = configureStore({
   reducer:counterSlice.reducer   // reducer: counterSlice.reducer  reducer:{counter:counterSlice.reducer
}); //객체형식으로 여러 reducer를 병합가능

export const counterActions = counterSlice.actions;
export default store;


//redux에서 절대 기존의 state 변경 X , 새로운 state 객체를 return하여 항상 재정의 해줘야함