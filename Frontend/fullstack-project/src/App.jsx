import { Route, Routes } from "react-router-dom";
import Authlayout from "./components/auth/layout";
import Login from "./pages/common/Login";
import SignUp from "./pages/common/SignUp";

function App() {
  

  return (
    <div  className="w-full" >
      <Routes>
        <Route path="/auth" element={<Authlayout/>}>
            <Route path="login" element={<Login/>}/>
            <Route path="register" element={<SignUp/>}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
