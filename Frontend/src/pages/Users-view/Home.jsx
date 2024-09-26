import React from 'react'
import { useSelector } from 'react-redux'



function Home() {
  const user = useSelector(state => state.user)
  return (
    <>
    <div>Hello {user.username}</div>
    <div>Your email is {user.email}</div>
    <div>Your id is {user.id}</div>
    <div>Your isAdmin is {user.isAdmin}</div>
    <div>Cart : {user.cart}</div>
    <div>Cart length : {user.cart.length}</div>
    <div>Order : {user.order}</div>
    <div>Order length : {user.order.length}</div>
    </>

  )
}

export default Home