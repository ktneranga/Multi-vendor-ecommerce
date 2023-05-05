import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { LoginPage } from './Routes'
import './App.css'

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/login' element={<LoginPage/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App