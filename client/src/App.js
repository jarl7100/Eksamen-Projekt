import React, { useEffect, useState } from 'react'
import Cryptocurrencies from './components/Cryptocurrencies';
import Navbar from './components/Navbar';
import News from './components/News';
import Signup from './components/Signup';
import Signin from './components/Signin';
import Cryptostats from './components/Cryptostats';
import { Route, Routes } from 'react-router-dom';
import {Toolbar} from '@mui/material';

function App() {
  return (
    <>
      <Navbar/>
          <Toolbar/>
    <div className='container'>
      <Routes>
        <Route path='/cryptos' element={<Cryptocurrencies/>}/>
        <Route path='/news' element={<News/>}/>
        <Route path='/cryptostats' element={<Cryptostats/>}/>
        <Route path='/Signup' element={<Signup/>}/>
        <Route path='/Signin' element={<Signin/>}/>
      </Routes>
    </div>
    </>
  )
}

export default App

  /*   const [backendData, setBackendData] = useState([{}])
  
    useEffect(() => {
      fetch("/api").then(
        res => res.json())
        .then(
          data => {
          setBackendData(data)
          }
        )
  }, []) */