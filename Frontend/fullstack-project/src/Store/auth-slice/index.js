import apiHandler from "@/utils/axios/apiHandler"
import  {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import axios from "axios"
import { useState } from "react"




const initialState = {
    isAuthenticated: false,
    isLoading: false,
    user:null
}

export const  registerHandel = createAsyncThunk("auth/register",async(formdata)=>{
   try {
    const response = await apiHandler("POST","/api/v1/register",formdata)

   
    return response.data
   } catch (error) {
     console.log(error)
   }
})

export const loginhandeler  = createAsyncThunk("/auth/login",async(formdata)=>{

    try {
        const response = await apiHandler("POST","/api/v1/login",formdata)

        return response.data
    } catch (error) {
        console.log(error)
    }
})

export const check_Auth = createAsyncThunk("/auth/checkAuth",async()=>{

    try {
        const response = await apiHandler("GET","/api/v1/checkAuth")
        console.log(response.data,"Check auth response")

        return response.data
    } catch (error) {
        console.log(error)
    }
})

export const logout = createAsyncThunk("/auth/logout",async()=>{
    try {
        const response = await apiHandler("POST","/api/v1/logout")
         return response.data
    } catch (error) {
        console.log(error)
    }
})

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers:{
       setUser:(state,action)=>{
       
       }
    },
    extraReducers:(builder)=>{
        builder.addCase(registerHandel.pending,(state)=>{
            state.isLoading = true,
            state.isAuthenticated = false
        }).addCase(registerHandel.fulfilled,(state,action)=>{
            state.isLoading = false,
            state.isAuthenticated = action.payload.success?action.payload.success:false,
            state.user = action.payload.user
            localStorage.setItem("isAuthenticated",state.isAuthenticated)
            localStorage.setItem("user",JSON.stringify(state.user))
        }).addCase(registerHandel.rejected,(state)=>{
            state.isLoading = false,
            state.isAuthenticated = false
        }).addCase(check_Auth.pending,(state)=>{
            state.isLoading = true,
            state.isAuthenticated = false
        }).addCase(check_Auth.fulfilled,(state,action)=>{
            state.isLoading = false,
            state.isAuthenticated = action.payload.success?action.payload.success:false,
            state.user = action.payload.user?action.payload.user:null
            localStorage.setItem("isAuthenticated",state.isAuthenticated)
            localStorage.setItem("user",JSON.stringify(state.user))
        }).addCase(check_Auth.rejected,(state)=>{
            state.isLoading = false,
            state.isAuthenticated = false
        }).addCase(loginhandeler.pending,(state)=>{
            state.isLoading = true,
            state.isAuthenticated = false
        }).addCase(loginhandeler.fulfilled,(state,action)=>{
            state.isLoading = false,
            state.isAuthenticated = action.payload.success?action.payload.success:false,    
            state.user = action.payload.user?action.payload.user:null
            localStorage.setItem("isAuthenticated",state.isAuthenticated)
            localStorage.setItem("user",JSON.stringify(state.user))
        }).addCase(loginhandeler.rejected,(state)=>{
            state.isLoading = false,
            state.isAuthenticated = false
        }).addCase(logout.pending,(state)=>{
            state.isLoading = true,
            state.isAuthenticated = false
        }).addCase(logout.fulfilled,(state,action)=>{
            state.isLoading = false,
            state.isAuthenticated = action.payload.success?action.payload.success:false,    
            state.user = action.payload.user?action.payload.user:null
            localStorage.setItem("isAuthenticated",false)
            localStorage.setItem("user",null)
        }).addCase(logout.rejected,(state)=>{
            state.isLoading = false,
            state.isAuthenticated = false
        })
}
})

export const {setUser} = authSlice.actions
export default authSlice.reducer



