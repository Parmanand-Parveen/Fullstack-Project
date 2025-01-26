import apiHandler from "../../utils/axios/apiHandler"
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"




export const addAddress = createAsyncThunk("/shop/addAddress",
     async(formdata)=>{
        
       try {
        const result = await apiHandler("POST","/api/v1/shop/addaddress",formdata)
        
        return result.data
       } catch (error) {
        
       }
   
     }
)

export const deleteAddress = createAsyncThunk("/shop/deleteAddress",
    async(id)=>{
     
        try {
            const result =await apiHandler("DELETE",`/api/v1/shop/deleteaddress/${id}`)

            console.log(result)
            return result.data
        } catch (error) {
            
        }

    }
)

export const editAddress = createAsyncThunk("/shop/updateaddress",
    async(id)=>{
     
        try {
            const result =await apiHandler("PUT",`/api/v1/shop/updateaddress/${id}`)

            console.log(result)
            return result.data
        } catch (error) {
            
        }

    }
)

export const fetchAllAddress = createAsyncThunk("/shop/getaddress",
    async(id)=>{
     
        try {
            const result =await apiHandler("GET",`/api/v1/shop/getaddress/${id}`)

            
            return result.data
        } catch (error) {
            
        }

    }
)




 const initialState = {
    addresses : [],
    isLoading : false,
 } 

 export const addressSlice = createSlice({
    name:"address",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
     builder.addCase(fetchAllAddress.rejected,(state,action)=>{
        state.addresses =[];
        state.isLoading= false
     }).addCase(fetchAllAddress.pending,(state,action)=>{
        state.addresses= [];
        state.isLoading = true;
     }).addCase(fetchAllAddress.fulfilled,(state,action)=>{
        state.addresses = action?.payload?.address? action?.payload?.address:[];
        state.isLoading= false
     }).addCase(deleteAddress.rejected,(state,action)=>{
        state.addresses =[];
        state.isLoading= false
     }).addCase(deleteAddress.pending,(state,action)=>{
        state.addresses= [];
        state.isLoading = true;
     }).addCase(deleteAddress.fulfilled,(state,action)=>{
        state.addresses = action?.payload?.address? action?.payload?.address:[];
        state.isLoading= false
     }).addCase(addAddress.rejected,(state,action)=>{
        state.addresses =[];
        state.isLoading= false
     }).addCase(addAddress.pending,(state,action)=>{
        state.addresses= [];
        state.isLoading = true;
     }).addCase(addAddress.fulfilled,(state,action)=>{
        state.addresses = action?.payload?.address? action?.payload?.address:[];
        state.isLoading= false
     })

    }
 })


 export default addressSlice.reducer;