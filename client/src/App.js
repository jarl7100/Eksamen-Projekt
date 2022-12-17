import React, { useEffect, useState } from 'react'
import Cryptocurrencies from './components/Cryptocurrencies';
import Navbar from './components/Navbar';
import News from './components/News';
import Signup from './components/Signup';
import Signin from './components/Signin';
import Mypage from './components/Mypage';
import Home from './components/Home';
import CryptoDetails from './components/CryptoDetails';
import Cryptostats from './components/Cryptostats';
import { Route, Routes } from 'react-router-dom';
import { Toolbar } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './App.css';

function App() {
  const client = new QueryClient();
  return (
    <>
      <QueryClientProvider client={client}>
        <Navbar />
        <Toolbar />
        <div className='container'>
          <Routes>
          <Route path='/' element={<Home />} />
            <Route path='/cryptos' element={<Cryptocurrencies />} />
            <Route path='/news' element={<News />} />
            <Route path='/cryptostats' element={<Cryptostats />} />
            <Route path='/Signup' element={<Signup />} />
            <Route path='/Signin' element={<Signin />} />
            <Route path='/Mypage' element={<Mypage />} />
            <Route path='/crypto/:coinId' element={<CryptoDetails />} />
          </Routes>
        </div>
      </QueryClientProvider>
    </>
  )
}

export default App
