
import './App.css'
import Home from './pages/Home'
import Signin from './pages/Signin'
import CreateAccount from './pages/CreatAccount'
import {createBrowserRouter, Router, RouterProvider} from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import AddProject from './pages/AddProject'
import AllProjects from './pages/AllProjects'

function App() {
  const Router = createBrowserRouter([
    {
      path:'/',
      element : <Home/>
    },
    {
      path:'/Signin',
      element : <Signin/>
    },
    {
      path:'/CreateAccount',
      element : <CreateAccount/>
    },
    {
      path:'/Dashboard',
      element : <Dashboard/>
    },
    {
      path:'/AddProject',
      element : <AddProject/>
    },
    {
      path:'/AllProjects',
      element : <AllProjects/>
    },

  ])
  return (
    <div>
      <RouterProvider router={Router}/>
    </div>
  );
}

export default App
