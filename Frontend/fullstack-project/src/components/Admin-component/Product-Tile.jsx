import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button } from "../ui/button";
import { deleteProduct } from "@/Store/admin/product";
import { Sheet } from "lucide-react";
import { SheetContent, SheetTitle, SheetTrigger } from "../ui/sheet";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select";
import { Link, Navigate, NavLink, useNavigate } from "react-router-dom";

function ProductTile({ products }) {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const initialState = {
    name: "",
    description: "",
    price: "",
    saleprice: "",
    category: "",
    quantity: "",
    brand: "",
    image: "",
  };
  
  const [productData, setProductData] = useState  (initialState);

const handleProduct = (id) => {
  {console.log(id)}
  <Link to={`/admin/product/${id}`}/>
}

  return (
    <div>
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-5 p-5">
        {products.map((product) => (
          <div className="bg-gray-700 p-3" key={product._id}>
            <img
              className="w-96 h-60 object-cover"
              src={product.image}
              alt="image"
            />
            <h1 className="text-white">{product.name}</h1>
            <p
              className={`text-white ${
                product.saleprice > 0 ? "line-through text-gray-400" : ""
              }`}
            >
              {product.price}
            </p>
            <p>{product.saleprice}</p>
            <p className={`text-white `}>{product.quantity}</p>
            <p className="text-white">{product.description}</p>
            <p>{product.category}</p>
            <p>{product.brand}</p>
            <div className="flex justify-between px-3">
              {" "}
              <Button
                className="bg-red-500 hover:bg-red-800 border-none"
                onClick={() =>
                  dispatch(deleteProduct(product._id)).then(() => {
                    window.location.reload();
                  })
                }
              >
                Delete
              </Button>
              <Button className="bg-blue-500 hover:bg-blue-800 border-none"  onClick={() => navigate(`/admin/edit/${product._id}`)}>
              Update
            </Button>
              
            </div>
          </div>
        ))}
        
      </section>
    </div>
  );
}
export default ProductTile;
