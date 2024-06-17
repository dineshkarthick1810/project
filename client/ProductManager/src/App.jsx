import React, { useState }  from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.js"
import Transaction from './component/Transaction'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './component/Login'

function App() {
  const [theme,setTheme]=useState(false)

  return (
    <>

   <BrowserRouter>
   <Routes>
    <Route path='/' element={<Login/>} />
    <Route path='/Transaction' element={<Transaction theme={theme} setTheme={setTheme}/>} />

    
   </Routes>
   </BrowserRouter>
   
     
    </>
  )
}

export default App
