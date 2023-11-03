import logo from './logo.svg';
import './App.css';
import Protected from './component/Protected';
import {
  Routes,
  Route,
} from "react-router-dom";
import ResponsiveAppBar from './component/NavBar';
import Login from './component/Login';
import Players from './component/Players';
import About from './component/About';
import Dashboard from './component/Dashboard';
import Add from './component/Add';
import Edit from './component/Edit';
import Detail from './component/Detail';
import Contact from './component/Contact';
function App() {
  return (
    <div className="App">
      <ResponsiveAppBar/>
      <Routes>
        <Route path='/' element={<Players/>} ></Route>
        <Route path='/login' element={<Login/>} ></Route>
        <Route path='/about' element={<About/>} ></Route>
        <Route path='/contact' element={<Contact/>} ></Route>
        <Route path='/detail/:id' element={<Detail/>}></Route>
        <Route path='/dashboard' element={<Protected><Dashboard/></Protected>}></Route>
        <Route path='/add' element={<Protected><Add/></Protected>}></Route>
        <Route path='/edit' element={<Protected><Edit/></Protected>}></Route>
      </Routes>
    </div>
  );
}

export default App;
