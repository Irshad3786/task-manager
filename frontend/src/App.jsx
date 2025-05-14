import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './pages/Home'
import Signin from './pages/Signin'
import CreateAccount from './pages/CreatAccount'
import Dashboard from './pages/Dashboard'
import AddProject from './pages/AddProject'
import AllProjects from './pages/AllProjects'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
       <AllProjects/>
      </div>
       
    </>
  )
}

export default App
