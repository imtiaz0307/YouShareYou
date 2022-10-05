import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './Components/Navbar/Navbar';
import Home from './Pages/Home';
import About from './Pages/About';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Stories from './Pages/Stories';
import { useEffect } from 'react';
import { useContext } from 'react';
import AppContext from './Context/AppContext';


function App() {
  const {currentUser} = useContext(AppContext)
  useEffect(() => {
    localStorage.getItem('token') && currentUser()
  })
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/stories' element={<Stories/>} />
          <Route path='/about' element={<About/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/signup' element={<Signup/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
