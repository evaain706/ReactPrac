import React from 'react';
import { useRef } from 'react';
import classes from './NewTodo.module.css';

const NewTodo: React.FC<{ onAddTodo: (text: string) => void }> = (props) => {
  //함수를 props로 받아올때

  const todoTextInputRef = useRef<HTMLInputElement>(null); //TS에서의 input요소 useRef사용

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    const currentText = todoTextInputRef.current!.value;

    if (currentText?.trim().length === 0) {
      //throw error
      return;
    }

    props.onAddTodo(currentText);
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <label htmlFor='text'>Todo Text</label>
      <input type='text' id='text' ref={todoTextInputRef} />
      <button>Todo추가</button>
    </form>
  );
};

export default NewTodo;
