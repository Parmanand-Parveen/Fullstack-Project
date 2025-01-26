import apiHandler from "../../utils/axios/apiHandler";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  isLoading: false,
};

export const createProduct = createAsyncThunk(
  "/admin/createProduct",
  async (formData) => {
    try {
      const product = await apiHandler(
        "POST",
        "/api/v1//create/product",
        formData
      );
    
      return product.data;
    } catch (error) {}
  }
);

export const readProduct = createAsyncThunk("/admin/readProduct", async () => {
  try {
    const product = await apiHandler("GET", "/api/v1/read/products");
 
    return product.data;
  } catch (error) {
    console.log(error);
  }
});

export const deleteProduct = createAsyncThunk(
  "/admin/deleteProduct",
  async (id) => {
    try {
      const product = await apiHandler(
        "DELETE",
        `/api/v1/delete/products/${id}`
      );
      return product.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const editProduct = createAsyncThunk(
  "/admin/editProduct",
  async ({id,formData}) => {
    console.log(id)
    try {
      const product = await apiHandler(
        "PUT",
        `/api/v1/update/products/${id}`,
        formData
      );
    
      return product.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createProduct.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products.push(action.payload.product);
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(readProduct.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(readProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload.products;
      })
      .addCase(readProduct.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(deleteProduct.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.isLoading = false;
      }).addCase(editProduct.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(editProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload.products;
      })
      .addCase(editProduct.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});

export default productSlice.reducer;
