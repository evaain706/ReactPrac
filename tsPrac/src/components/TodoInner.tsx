import React from 'react';
import Todo from '../models/todo';
import classes from './TodoInner.module.css';

const TodoInner: React.FC<{
  text: string;
  removeOnClick: (id: string) => void;
  id: string;
}> = (props) => {
  return (
    <>
      <li
        onClick={() => props.removeOnClick(props.id)}
        className={classes.item}
      >
        {props.text}
      </li>
    </>
  );
};

export default TodoInner;
