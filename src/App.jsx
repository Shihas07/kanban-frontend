import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Signup from './components/signup'
import Login from './components/login'
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import Home from './components/home'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
       <Router>
        <Routes>
          <Route path='/' element={ <Home/>} />
          <Route path='/signup' element={  <Signup/>} />

            
          <Route path='/login' element={  <Login/>} />
           
        </Routes>
     
        </Router>

    </>
  )
}

export default App
