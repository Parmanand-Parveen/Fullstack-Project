import apiHandler from "@/utils/axios/apiHandler";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { serviceworker } from "globals";

const initialState= {
    shopProduct: [],
    isLoading: false
}

export const fetchAllShopProduct = createAsyncThunk(
    "/shop/fetchAllShopProduct",
    async (searchParams) => {
      console.log(searchParams)
     const formData = {
      some: "data",
     };
      try {
        const getShopProduct = await apiHandler("GET", `/api/v1/shop/getproduct`,{},{someheader:"data"},{someparams:searchParams});
        
        return  getShopProduct.data.products;
      } catch (error) {
        console.log(error);
      }
    }
  );



  const shopProduct = createSlice({
    name: "shopProduct",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
          .addCase(fetchAllShopProduct.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(fetchAllShopProduct.fulfilled, (state, action) => {
            state.isLoading = false;
            state.shopProduct = action.payload;
          })
          .addCase(fetchAllShopProduct.rejected, (state) => {
            state.isLoading = false;
          });
      },
  });

  export default shopProduct.reducer
