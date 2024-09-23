import {configureStore} from "@reduxjs/toolkit"
import userSlice from "./Slices/UserSlice"



const store = configureStore({
    reducer:userSlice
})

console.log(userSlice)


export default store