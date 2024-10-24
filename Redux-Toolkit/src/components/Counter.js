import {useSelector,useDispatch,} from 'react-redux'; //store와 연결하기위해 import
import React from 'react';
import { useState } from 'react';
import { counterActions } from '../store/counter-slice';
import classes from './Counter.module.css';

const Counter = () => {

  const [input,setInput] = useState(0);
    
  const counter = useSelector(state => state.counter.counter); //configuareStore에서 여러개의 리듀서를 객체형태로 합쳤을경우 state.(slice의 name).(state명)형식으로
  const show = useSelector(state => state.counter.showCounter);
 
  const dispatch = useDispatch(); //store에서 action을 전달받기위한 함수

  const onChange = (e) => {
    
     setInput(e.target.value);
     console.log(input);
     
  }

  const incrementHandler = () => {
    dispatch(counterActions.increment());
  };

  const decrementHandler = () => {
    dispatch(counterActions.decrement());
  };

  const increaseHandler = () => {
    dispatch(counterActions.increase(+input)); // action에 amount라는 payload를 추가 store에 있는것과 여기의  이름이 같아야함
    console.log(counter)
  };

  const toggleCounterHandler = () => {
    dispatch(counterActions.toggleCounter())
    
  };

  return (
    <main className={classes.counter}>
      <h1>Redux 카운터연습</h1>
      {show && <div className={classes.value}>{counter}</div>} 
      <div>
        <button onClick={incrementHandler} >증가</button>
        <input  onChange={onChange} value={input}></input>
        <button onClick={increaseHandler} >input입력값만큼 증가</button>
        <button onClick={decrementHandler}>감소</button>
      </div>
      <button onClick={toggleCounterHandler}>카운터 켜기/끄기</button>
    </main>
  );
};

export default Counter;
