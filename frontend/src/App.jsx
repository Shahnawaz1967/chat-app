import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import HomePage from './components/HomePage'
import SigunUp from './components/SigunUp'
import Login from './components/Login'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'

function App() {
  axios.defaults.withCredentials = true

  return (
    <div className='p-4 h-screen flex justify-center items-center'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<SigunUp />} />
          <Route path='/login' element={<Login />} />
          <Route path='/home' element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
