import React, { useEffect } from 'react'
import { BrowserRouter,Routes, Route,Navigate  } from 'react-router-dom'
import Home from './components/Home';
import Signup from './components/Signup';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import UserProfile from './components/UserProfile';
import ULikes from './components/ULikes';
import UQuotes from './components/UQuotes';

import './App.css';
import userpool from './userpool';

function App() {

  useEffect(()=>{
    let user=userpool.getCurrentUser();
      if(user){
        <Navigate to="/dashboard" replace />
      }
  },[]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/signup' element={<Signup />}/>
        <Route path='/login' element={<Login />}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/userprofile" element={<UserProfile />} /> 
        <Route path="/Ulikes" element={<ULikes />} /> 
        <Route path="/UQuotes" element={<UQuotes />} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;
