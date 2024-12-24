import { Route, Routes } from "react-router-dom";
import Authlayout from "./components/auth/layout";
import Login from "./pages/common/Login";
import SignUp from "./pages/common/SignUp";
import Home from "./pages/user-view/Home";
import Adminlayout from "./pages/admin-view/Adminlayout";
import Adminproduct from "./pages/admin-view/Product";
import Productlisting from "./pages/user-view/Productlisting";
import Admindashboard from "./pages/admin-view/Dashboard";
import Useraccount from "./pages/user-view/User-account";
import Checkauth from "./pages/common/Check-auth";
import Home2 from "./pages/user-view/Home2";
import { useDispatch, useSelector } from "react-redux";
import { check_Auth } from "./Store/auth-slice";
import { useEffect } from "react";
import AdminOrder from "./pages/admin-view/Order";
import { Toaster } from "./components/ui/toaster";
import Order from "./pages/user-view/Order";
import Wishlist from "./pages/user-view/Wishlist";
import Address from "./pages/user-view/Address";
import Edit from "./pages/admin-view/Edit";
import { getCart } from "./Store/shop/cart";
import Checkout from "./pages/user-view/Checkout";
import { fetchAllFeatureImg } from "./Store/admin/featureImg";


function App() {
  const dispatch =useDispatch()
   
  // const {isLoading ,isAuthenticated,user} = useSelector((state)=>state.auth)
  const isAuthenticated = localStorage.getItem("isAuthenticated");
  const user = JSON.parse(localStorage.getItem("user"));
  // const dispatch = useDispatch();
  

  useEffect(() => {
    if(isAuthenticated && user.isAdmin== "user"){
    dispatch(getCart(user._id))
    }
    dispatch(fetchAllFeatureImg())
  }, [dispatch]);

  
  
 
  
  return (
    <div className="">
    <Toaster/>
      <Routes>
      <Route path="/" element={<Home2 />} /> 
      <Route path="/auth" element={<Checkauth isAuhenticated={isAuthenticated} user={user}><Authlayout /></Checkauth>}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<SignUp />} />
        </Route>
        <Route path="/admin" element={<Checkauth  isAuhenticated={isAuthenticated} user={user}><Adminlayout /></Checkauth>}>
          <Route path="product" element={<Adminproduct />} />
          <Route path="dashboard" element={<Admindashboard />} />
          <Route path="order" element={<AdminOrder/>}/>
          <Route path="edit/:id" element={<Edit/>}/>
        </Route>
        <Route path="/home" element={<Checkauth isAuhenticated={isAuthenticated} user={user}>  <Home /> </Checkauth>}>
             <Route path=""  element={<Home2/>}/>
             <Route path="productlisting" element={<Productlisting/>}/>
             <Route path="useraccount" element={<Useraccount/>}/>
             <Route path="order" element={<Order/>}/>
             <Route path="address" element={<Address/>}/>
             <Route path="wishlist" element={<Wishlist/>}/>
             <Route path="checkout" element={<Checkout/>}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
