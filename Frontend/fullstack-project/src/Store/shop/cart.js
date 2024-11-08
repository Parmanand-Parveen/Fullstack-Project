import apiHandler from "@/utils/axios/apiHandler";
import { createAsyncThunk, createSlice, isRejected } from "@reduxjs/toolkit";
import { act } from "react";

const initialState = {
  cartItems: [],
  totalAmount: 0,
  totalQuantity: 0,
};

export const getCart = createAsyncThunk("/shop/getcart", async (id) => {
  console.log(id)
  try {
    const cartItems = await apiHandler("Get","/api/v1/shop/getcart/"+id);
    console.log(cartItems);
    console.log(cartItems.data.cart.items);
    return cartItems.data.cart.items;
  } catch (error) {
    console.log(error);
  }
});

export const clearCart= createAsyncThunk("/shop/clearCart",async(userId)=>{
  try {
     const emptyCart = await apiHandler("DELETE","/api/v1/shop/clearcart",userId)     
     return emptyCart
  } catch (error) {
    
  }
})

export const removeCartItem = createAsyncThunk("/shop/deletecart/item",async(data)=>{
    console.log(data)
  try {
     const deleteCartItem = apiHandler("DELETE","/api/v1/shop/deletecart/item",data)  
     console.log(deleteCartItem)
  } catch (error) {
    
  }
})

export const addToCart = createAsyncThunk(
  "/shop/addtocart",
  async (formData) => {
    console.log(formData);
    try {
      const product = await apiHandler(
        "POST",
        "/api/v1/shop/addtocart",
        formData
      );
      return product.data;
    } catch (error) {}
  }
);

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.rejected, (state, action) => {
        state.cartItems = state.cartItems ? state.cartItems : [];
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        const item = action.payload;
        state.cartItems.push(item);
      })
      .addCase(addToCart.pending, (state, action) => {
        state.cartItems = state.cartItems ? state.cartItems : [];
      })
      .addCase(getCart.rejected, (state, action) => {
        state.cartItems = state.cartItems ? state.cartItems : [];
      })
      .addCase(getCart.fulfilled, (state, action) => {
        const item = action?.payload;
        state.cartItems=item;
      })
      .addCase(getCart.pending, (state, action) => {
        state.cartItems = state.cartItems ? state.cartItems : [];
      })
      .addCase(clearCart.rejected, (state, action) => {
        state.cartItems = state.cartItems ? state.cartItems : [];
      })
      .addCase(clearCart.fulfilled, (state, action) => {
        state.cartItems=[];
      })
      .addCase(clearCart.pending, (state, action) => {
        state.cartItems = state.cartItems ? state.cartItems : [];
      })
      .addCase(removeCartItem.rejected, (state, action) => {
        state.cartItems = state.cartItems ? state.cartItems : [];
      })
      .addCase(removeCartItem.fulfilled, (state, action) => {
          
      })
      .addCase(removeCartItem.pending, (state, action) => {
        state.cartItems = state.cartItems ? state.cartItems : [];
      });
  },
});

export default cartSlice.reducer;
