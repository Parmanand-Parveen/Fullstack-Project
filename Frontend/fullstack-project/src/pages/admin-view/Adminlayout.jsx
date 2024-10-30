import { Button } from '@/components/ui/button'
import { logout } from '@/Store/auth-slice'
import { LayoutDashboard, PackageOpen, ShoppingBasket } from 'lucide-react'
import { CgProductHunt } from "react-icons/cg";
import React from 'react'
import { useDispatch } from 'react-redux'
import { Link, Navigate, NavLink, Outlet, useNavigate } from 'react-router-dom'

function Adminlayout() {
  const dispatch = useDispatch()

  const navigate = useNavigate()

 

  return (
    <div className='flex'>
    <aside className='w-1/6 min-h-screen bg-zinc-800 flex flex-col text-white'>
    <div onClick={() => navigate('/admin/dashboard')} className='mt-5 mb-3 justify-center gap-2 flex items-center cursor-pointer '><ShoppingBasket />E-commerce</div>
    <NavLink to='/admin/dashboard' className={({ isActive }) =>`${isActive ? 'bg-zinc-700' : ''} text-white text-lg px-3 py-2 rounded-md hover:text-white hover:bg-zinc-700 flex items-center gap-2` } ><LayoutDashboard />Dashboard </NavLink>
    <NavLink to='/admin/product' className={({ isActive }) =>`${isActive ? 'bg-zinc-700' : ''} text-white text-lg px-3 py-2 rounded-md hover:text-white flex items-center gap-2 hover:bg-zinc-700` }   ><span className='text-2xl'><CgProductHunt /></span>Product </NavLink>
    <NavLink to={'/admin/order'} className={({isActive})=>`${isActive ? 'bg-zinc-700' : ''} px-3 py-2 rounded-md text-white text-lg hover:text-white flex items-center gap-2 hover:bg-zinc-700  `}><PackageOpen />Orders</NavLink>
    </aside>
   <div className='w-5/6 '>
       <Outlet/>
   </div>
    </div>
  )
}

export default Adminlayout