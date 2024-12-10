import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { fetchAllAddress } from '@/Store/shop/addressSlice';
import React, { useEffect } from 'react';
import { MdOutlineShoppingCartCheckout } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Checkout() {
  const cartItem = useSelector((state) => state.userCart);
  const  address = useSelector((state)=>state.address)
  const user =  JSON.parse(localStorage.getItem("user")) 
   const dispatch = useDispatch()
  useEffect(() => {
     dispatch(fetchAllAddress(user._id))
  }, [dispatch])
  
  const navigate = useNavigate()
  console.log(address);

  return (
    <div className="flex flex-col items-center w-full max-w-lg p-6 mx-auto bg-white shadow-lg rounded-lg gap-4 dark:bg-gray-800 dark:text-gray-200">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Checkout</h1>
      <Separator className="w-full" />
      
      <h2 className="text-lg font-semibold text-gray-600 dark:text-gray-300">Cart Items</h2>
      <div className="flex flex-col w-full gap-4 p-4 border rounded-lg dark:border-gray-700">
        {cartItem.cartItems.length > 0 ? (
          cartItem.cartItems.map((item) => (
            <div
              className="flex items-center gap-4 border-b pb-4 last:border-b-0 dark:border-gray-700"
              key={item?.product?._id}
            >
              <img
                className="w-24 h-24 object-cover rounded-md"
                src={item?.product?.image}
                alt={item?.product?.name}
              />
              <div className="flex flex-col flex-grow">
                <h3 className="text-lg font-medium text-gray-800 dark:text-gray-100">
                  {item?.product?.name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Price: ₹{( item?.product?.saleprice > 0 ? item?.product?.saleprice : item?.product?.price )}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Quantity: {item?.quantity}</p>
              </div>
            </div>
          ))
        
        ) : (
          <p className="text-gray-500 dark:text-gray-400">No items in the cart</p>
        )}
        {cartItem.cartItems.length > 0 && (
          <div className="flex justify-between items-center pt-4 border-t dark:border-gray-700">
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">
              Subtotal: ₹
              {cartItem?.cartItems?.reduce(
                (acc, item) => acc + ( item?.product?.saleprice > 0 ? item?.product?.saleprice : item?.product?.price ) * item?.quantity,
                0
              )}
            </h3>
          </div>
        )}
      </div>

      <div className="flex flex-col w-full gap-4 p-4 border rounded-lg dark:border-gray-700">
  <h2 className="text-lg font-semibold text-gray-600 dark:text-gray-300">Select Address</h2>

  {address?.addresses?.length > 0 ? (
    address?.addresses.map((addr) => (
      <div
        key={addr?._id}
        className="flex items-start gap-4 p-4 border rounded-lg shadow-sm cursor-pointer hover:shadow-md dark:border-gray-700 dark:hover:shadow-gray-600"
      >
        <input
          type="radio"
          id={`address-${addr?._id}`}
          name="address"
          value={addr?._id}
          className="mt-1 accent-blue-800 focus:outline-neutral-50"
        />  
        <label htmlFor={`address-${addr?._id}`} className="flex-grow cursor-pointer">
          <p className="text-lg font-medium text-gray-800 dark:text-gray-100">{addr?.name}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400"> {addr?.phone}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">{addr?.address}, {addr?.city}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">{addr?.state}, {addr?.pincode},</p> 
          <p className="text-sm text-gray-500 dark:text-gray-400">{addr.country}</p>
        </label>
      </div>  
    ))
  ) : (
    <p className="text-gray-500 dark:text-gray-400">No saved addresses. Please add one below.</p>
  )}

  <Button onClick={()=>{navigate("/home/address")}} className="w-full bg-green-600 text-white hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600">
    Add New Address
  </Button>
</div>


      {cartItem.cartItems.length > 0 && (
        <Button className="flex items-center gap-2 w-full justify-center bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600">
          <MdOutlineShoppingCartCheckout className="text-2xl" onClick={""}/>
           Make Payment
        </Button>
      )}
    </div>
  );
}

export default Checkout;
