import { configureStore } from "@reduxjs/toolkit" 
import authReducer from "./auth-slice";
import productReducer from "./admin/product"
import shopReducer from "./shop/shopProduct"
import cartReducer from "./shop/cart"
import addressReducers from "./shop/addressSlice"
import featureImgReducer from "./admin/featureImg"


const store = configureStore({
    reducer: {
        auth: authReducer,
        product: productReducer,
        shopingProduct :shopReducer,
        userCart:cartReducer,
        featureImg:featureImgReducer,
        address:addressReducers
    }
})


export default store