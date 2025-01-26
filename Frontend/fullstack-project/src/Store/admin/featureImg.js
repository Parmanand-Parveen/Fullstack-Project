import apiHandler from "../../utils/axios/apiHandler";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    featureImg: null,
    isLoading: false,
};

export const fetchAllFeatureImg = createAsyncThunk(
    "/admin/fetchAllFeatureImg",
    async () => {
      try {
        const getFeatureImg = await apiHandler("GET", "/api/v1/get/featureimage");
        console.log(getFeatureImg);
        return getFeatureImg.data;
      } catch (error) {
        console.log(error);
      }
    }
)

// export const deleteFeatureImg = createAsyncThunk(
//     "/admin/deleteFeatureImg",
//     async (id) => {
//       try {
//         const deleteFeatureImg = await apiHandler("DELETE", `/api/v1/delete/featureimage/${id}`);
//         console.log(deleteFeatureImg);
//         return deleteFeatureImg.data;
//       } catch (error) {
//         console.log(error);
//       }
//     }
//   )
 
const featureImgSlice = createSlice({
    name: "featureImg",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchAllFeatureImg.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(fetchAllFeatureImg.fulfilled, (state, action) => {
            state.isLoading = false;
            state.featureImg = action?.payload?.result;
        })
        .addCase(fetchAllFeatureImg.rejected, (state) => {
            state.isLoading = false;
        })
      },
  });
  
  export default featureImgSlice.reducer