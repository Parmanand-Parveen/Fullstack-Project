import apiHandler from "../axios/apiHandler"
import { setUser } from "../../store/Slices/UserSlice"
import {useDispatch} from "react-redux"



export const signUpHandle = async (email,password,username,navigate,dispatch) => {
    
    // const dispatch = useDispatch()
    try {
        const response = await apiHandler("POST","/api/v1/register",{
            username,password,email
        })
        console.log(response)
        // dispatch(setUser(response.data))
        //  useDispatch(setUser(response))
        dispatch(setUser(response))
        navigate("/home")     
   
} catch (error) {
    console.log(error)
}}
