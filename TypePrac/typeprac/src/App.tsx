import React from 'react';
import logo from './logo.svg';
import './App.css';
import MainComp from './components/MainComp';

function App() {
  return (
    <div className='flex flex-col bg-slate-50 justify-center'>
      <div className='flex items-center justify-center'>
        <h2 className='font-bold text-2xl '>하이</h2>
      </div>

      <MainComp />
    </div>
  );
}

export default App;
