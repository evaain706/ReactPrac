import logo from './logo.svg';
import './App.css';
import './index.css'
import MainBody from './components/mainComp';
import Teams from './components/Teams';
import CommuList from './components/CommuList';
import { BrowserRouter,Routes,Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>

      <Routes>

      <Route path='/' element={<Teams/>}></Route>

      {/* <Route path='/videos' element={<MainBody/>}></Route> */}

      <Route path="/videos/:teamSearch" element={<MainBody />} />

      <Route path="/commu/:teamid" element={<CommuList/>} />

      </Routes>
     

      
      </BrowserRouter>

    

    
     
     
    </div>
  );
}

export default App;
