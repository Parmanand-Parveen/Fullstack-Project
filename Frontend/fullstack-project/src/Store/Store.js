import { configureStore } from "@reduxjs/toolkit" 
import authReducer from "./auth-slice";
import productReducer from "./admin/product"
import shopReducer from "./shop/shopProduct"
import cartReducer from "./shop/cart"


const store = configureStore({
    reducer: {
        auth: authReducer,
        product: productReducer,
        shopingProduct :shopReducer,
        userCart:cartReducer
    }
})


export default store