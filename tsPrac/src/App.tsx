import React from 'react';
import Todo from './models/todo';
import { useState } from 'react';

import './App.css';
import Todos from './components/Todos';
import NewTodo from './components/NewTodo';

function App() {
  const [todos, setTodos] = useState<Todo[]>([]); //Todo 타입의 아이템들이 들어온다는것을 TS에게 알려줌

  //Todo 추가
  const onAddTodo = (todoText: string) => {
    const newTodo: Todo = {
      id: new Date().toISOString(),
      text: todoText,
    };
    setTodos((prev) => {
      return prev.concat(newTodo);
    });
  };

  //Todo 삭제
  const removeOnClick = (id: string) => {
    setTodos((prev) => {
      return prev.filter((todo) => todo.id !== id);
    });
  };

  return (
    <div>
      <NewTodo onAddTodo={onAddTodo} />
      <Todos items={todos} removeOnClick={removeOnClick} />
    </div>
  );
}

export default App;
