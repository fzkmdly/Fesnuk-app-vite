import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import '../style/App.css';
import Home from './page/Home'
import LampSwitch from './page/Lamp'

const App: React.FC = () =>  {
  return (
    <Router>
      <Routes>
        <Route path="/ajdjasdjsa" element={<Home />} />
        <Route path="/" element={<LampSwitch />} />
      </Routes>
    </Router>
  )
}

export default App
