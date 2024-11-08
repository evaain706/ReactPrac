import logo from './logo.svg';
import './App.css';
import MainBody from './components/mainComp';
import Teams from './components/Teams';
import { BrowserRouter,Routes,Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>

      <Routes>

      <Route path='/' element={<Teams/>}></Route>

      <Route path='/videos' element={<MainBody/>}></Route>

      </Routes>
     

      
      </BrowserRouter>

    

    
     
     
    </div>
  );
}

export default App;
