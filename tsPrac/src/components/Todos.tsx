import React from 'react';
import Todo from '../models/todo';
import TodoInner from './TodoInner';
import classes from './Todos.module.css';

//FC라는 제네릭안에서 props 인자들의 타입정의해서 결합
const Todos: React.FC<{
  items: Todo[];
  removeOnClick: (id: string) => void;
}> = (props) => {
  //props는 객체형태로 넘어옴  React.FC라는 제네릭 형태로 함수형 컴포넌트로 동작한다고 선언

  //모든 커스텀 컴포넌트를 만들때마다 이런식으로 하면됨

  return (
    <ul className={classes.todos}>
      {props.items.map((item) => (
        <TodoInner
          key={item.id}
          text={item.text}
          id={item.id}
          removeOnClick={props.removeOnClick}
          //  removeOnClick={props.removeOnClick.bind(null,item.id)} id를 props로 넘겨주는거 말고 또다른 방법
        />
      ))}
    </ul>
  );
};

export default Todos;
