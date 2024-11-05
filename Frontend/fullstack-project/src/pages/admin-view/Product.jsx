import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import React, { useEffect, useState } from "react";
import { CgProductHunt } from "react-icons/cg";
import Imageupload from "@/components/Admin-component/Image-upload";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import apiHandler from "@/utils/axios/apiHandler";
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton";
import { useDispatch, useSelector } from "react-redux";
import {
  createProduct,
  deleteProduct,
  editProduct,
  readProduct,
} from "@/Store/admin/product";
import { NavLink, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Toast } from "@/components/ui/toast";
import ProductTile from "@/components/Admin-component/Product-Tile";

function Adminproduct() {
  const { toast } = useToast()
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [uploadImg, setUploadImg] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);
  const [imageLoadingState, setImageLoadingState] = useState(false);

   
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

  

  useEffect(() => {
    dispatch(readProduct()) ;
}, [dispatch]);

  const { products, isLoading } = useSelector((state) => state.product);
  console.log(products, isLoading);
  const [productData, setProductData] = useState(initialState);

  // console.log(uploadImg);
  // console.log(uploadedImageUrl);

  async function uploadImageToCloudinary() {
    setImageLoadingState(true);
    const data = new FormData();
    data.append("my_file", uploadImg);
    const response = await axios.post("/api/v1/upload-image", data);
    console.log(response);
    if (response?.data?.success) {
      setProductData({ ...productData, image: response.data.result.url });
      setUploadedImageUrl(response.data.result.url);
      setImageLoadingState(false);
    }
  }

  useEffect(() => {
    if (uploadImg !== null) uploadImageToCloudinary();
  }, [uploadImg]);

  function handleProduct(e) {
    e.preventDefault();
    const res = dispatch(createProduct(productData)).then((res) => {
      toast({
        title: "Success",
        description: "Product created successfully",
        variant: "default",
        isClosable: true,
      });
      setUploadImg(null);
    })
    setProductData(initialState);
    
  }

  //  function editProduct(e){
  //   e.preventDefault(e);
  //   const res =
  //   setProductData(initialState)
  //  }

  //  useEffect( () => {
  //    async()=>{
  //     if (uploadImg) {
  //       let result = await apiHandler("POST", "/api/v1/upload-image", uploadImg)
  //       console.log(result)
  //     }
  //    }

  //   }, [uploadImg])
  return (
    <div className="">
      <header className="flex w-full justify-between items-center px-5 py-3 border-b border-zinc-700">
        <div className="flex items-center gap-2">
          <span className="text-2xl">
            <CgProductHunt />
          </span>
          Product
        </div>
        <Sheet className="overflow-auto">
          <SheetTrigger className="text-white">Add Product</SheetTrigger>
          <SheetContent side="right" className="overflow-auto">
            <SheetTitle>Add New Product</SheetTitle>
            <form className="flex flex-col mt-3 gap-2" onSubmit={handleProduct}>
              {/*Upload Image component */}
              <Imageupload
                uploadImg={uploadImg}
                setUploadImg={setUploadImg}
                value={uploadedImageUrl}
              />
              <div className="flex flex-col">
                <Label>Name</Label>
                <Input
                  type="text"
                  value={productData.name}
                  onChange={(e) =>
                    setProductData({ ...productData, name: e.target.value })
                  }
                />
              </div>
              <div className="flex flex-col ">
                <Label>Price</Label>
                <Input
                  type="number"
                  value={productData.price}
                  onChange={(e) =>
                    setProductData({ ...productData, price: e.target.value })
                  }
                />
              </div>
              <div className="flex flex-col ">
                <Label>Sale Price</Label>
                <Input
                  type="number"
                  value={productData.saleprice}
                  onChange={(e) =>
                    setProductData({
                      ...productData,
                      saleprice: e.target.value,
                    })
                  }
                />
              </div>
              <div className="flex flex-col ">
                <Label>Quantity</Label>
                <Input
                  type="number"
                  value={productData.quantity}
                  onChange={(e) =>
                    setProductData({ ...productData, quantity: e.target.value })
                  }
                />
              </div>
              <div className="flex flex-col ">
                <Label>Description</Label>
                <textarea
                  className="bg-transparent border border-gray-300 rounded-md"
                  type="text"
                  value={productData.description}
                  onChange={(e) =>
                    setProductData({
                      ...productData,
                      description: e.target.value,
                    })
                  }
                />
              </div>

              <Select
                onValueChange={(e) =>
                  setProductData({ ...productData, category: e })
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
                  onValueChange={(e) =>
                    setProductData({ ...productData, brand: e })
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

              <Button type="submit">Add Product</Button>
            </form>
          </SheetContent>
        </Sheet>
      </header>
      <ProductTile products={products}/>
    </div>
  );
}

export default Adminproduct;
