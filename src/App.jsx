import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HOme from './components/HOme'
import Registretion from './components/Registretion'
import Login from './components/Login'

export default function App() {
  return (
  
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<HOme />}></Route>
          <Route exact path="/registretion" element={<Registretion />}></Route>
          <Route exact path="/login" element={<Login />}></Route>
        </Routes>
      </BrowserRouter>
    
  )
}
