import { Separator } from '@/components/ui/separator'
import React from 'react'
import { useSelector } from 'react-redux'

function Checkout() {
  
  const cartItem = useSelector((state)=>state.userCart)
  console.log(cartItem)
  

  return (
    <div>
      <h1>Checkout</h1>
      <h2>Cart Items</h2>
      {cartItem.cartItems.length > 0 ? (
        cartItem.cartItems.map((item) => (
          <div className='flex gap-5 w-96 pl-6 border-2 items-center' key={item?.product?._id}>
          <img className='w-24 h-24' src={item?.product?.image} alt="" />
            <h3>{item?.product?.name}</h3>
            <p >Quantity:{item?.quantity}</p>
          </div>
        ))
      ) : (
        <p>No items in cart</p>
      )}
     {cartItem.cartItems.length > 0 && <div className='flex gap-5 w-96 pl-6 border-8 '>
     <h3 className='font-bold'>Subtotal:₹
                    {cartItem?.cartItems?.reduce(
                      (acc, item) =>
                        acc + item?.product?.price * item?.quantity,
                      0
                    )}{" "}</h3>
     <p>{}</p>
     </div>}
     {}
    </div>
  )
}

export default Checkout