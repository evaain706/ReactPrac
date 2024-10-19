import { legacy_createStore as createStore } from 'redux';


export const INCREMENT = 'increment'; //redux 코드가 많아질때 type선언,적용부분에서 실수를 방지하기위해 상수로 만들어서 export -> 사용하는 컴포넌트에서 import해서 사용하도록



const initialState = {counter:0,showCounter:true}; //state 선언

const counterReducer = (state = initialState ,action) => {

    if(action.type === 'increment'){
        return{
            counter:state.counter +1,  //initialstate에 counter, showCounter 두개의 상태가 존재하므로 둘중 하나가 변하지 않더라도 return은 모두해줘야함
            showCounter:state.showCounter  //즉,reducer에서 상태를 업데이트할 때 모든 상태를 포함한 객체를 반환해야함
        }
    }

    if(action.type === 'increase'){
        return{
            counter:state.counter + action.amount,
            showCounter:state.showCounter,
        }
    }


    if(action.type === 'decrement'){
        return{
            counter: state.counter -1,
            showCounter:state.showCounter,
        }
    }

    if(action.type === 'toggle'){
        return{
            showCounter: !state.showCounter,
            counter:state.counter,
        }
    }
    return state;
};




const store = createStore(counterReducer);

export default store;


//redux에서 절대 기존의 state 변경 X , 새로운 state 객체를 return하여 항상 재정의 해줘야함