import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { editProduct, readProduct } from "@/Store/admin/product";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

function Edit() {
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
  const [editForm, setEditForm] = useState(initialState);
 
  const location = useLocation();

  let s = location.pathname.split("/").pop();
  const { products } = useSelector((state) => state.product);
  const product = products.find((product) => product._id === s);
 
  
  useEffect(() => {
    dispatch(readProduct());
    setEditForm(product);
  }, [dispatch]);
  return (
    <div className="ml-5 ">
      <h1 className="font-bold text-4xl mb-3">Edit From</h1>
      <form className="w-1/2 flex flex-col gap-5 ">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            type="text"
            className=""
            value={editForm.name}
            onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
          />
        </div>
        <div>
        <Label htmlFor="discription">Description</Label>
        <Textarea
          
          className=""
          value={editForm.description}
          onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
        />
        </div>
        <div>
         <Label htmlFor="price">Price</Label>
         <Input type="text" className="" value={editForm.price} onChange={(e) => setEditForm({ ...editForm, price: e.target.value })} />
        </div>
        <div>
         <Label htmlFor="saleprice">Sale Price</Label>
         <Input type="text" className="" value={editForm.saleprice} onChange={(e) => setEditForm({ ...editForm, saleprice: e.target.value })} />
        </div>
        <div>
        <Label htmlFor="saleprice">Quantity</Label>
        <Input type="text" className="" value={editForm.quantity} onChange={(e) => setEditForm({ ...editForm, quantity: e.target.value })} />
       </div>
        <Select
        value={editForm.category}
        onValueChange={(e) =>
          setEditForm({ ...editForm, category: e })
        }
      >
        <SelectTrigger className="bg-white">
          <SelectValue placeholder="Select a catagory" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Catagory</SelectLabel>
            <SelectItem value="men">Men</SelectItem>
            <SelectItem value="women">Women</SelectItem>
            <SelectItem value="kids">Kids</SelectItem>
            <SelectItem value="accessories">Accessories</SelectItem>
            <SelectItem value="other">other</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <div className="flex flex-col ">
        <Select
        value={editForm.brand}
          onValueChange={(e) =>
            setEditForm({ ...editForm, brand: e })
          }
        >
          <SelectTrigger className="bg-white">
            <SelectValue placeholder="Select a brand" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Catagory</SelectLabel>
              <SelectItem value="addeidas">Addidas</SelectItem>
              <SelectItem value="nike">Nike</SelectItem>
              <SelectItem value="h&M">H&M</SelectItem>
              <SelectItem value="zara">zara</SelectItem>
              <SelectItem value="other">other</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
           <Button onClick={(e) =>{
            e.preventDefault()
            dispatch(editProduct({id:s,formData:editForm})).then((res)=>{
              navigate('/admin/product')
              window.location.reload()
            })

           }}>Edit</Button>
      </form>
    </div>
  );
}

export default Edit;
