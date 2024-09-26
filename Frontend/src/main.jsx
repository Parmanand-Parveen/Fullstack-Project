import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import store from "../store/store"
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Signup from './pages/auth/Signup'
import Home from './pages/Users-view/Home'
import Layout from './pages/Layout'
import { Provider } from 'react-redux'
import Login from './pages/auth/Login'




const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout/>}>
        <Route path=''  element={<Signup/>} />
        <Route path="/login" element={<Login/>}/>
        <Route path='/home' element={<Home/>}/>
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode >
  <Provider store = {store}>
  <RouterProvider router = {router}/>
  </Provider>
  </StrictMode>,
)
