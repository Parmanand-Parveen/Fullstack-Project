import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { addToCart, getCart } from "@/Store/shop/cart";
import { fetchAllShopProduct } from "@/Store/shop/shopProduct";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams, useNavigate } from "react-router-dom"; // For URL manipulation

function Productlisting() {

  const {toast} =useToast()
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [searchParams, setSearchParams] = useSearchParams();

  const initialBrand = searchParams.getAll("brand") || [];
  const initialCategory = searchParams.getAll("category") || [];
  const initialSort = searchParams.get("sort") || "";

  const [sort, setSort] = useState(initialSort);
  const [filters, setFilters] = useState({
    brand: initialBrand,
    category: initialCategory,
    sort: initialSort,
  });

  const { shopProduct, isLoading } = useSelector((state) => state.shopingProduct);

  const brandFilter = [
    { id: "addidas", name: "Addidas" },
    { id: "nike", name: "Nike" },
    { id: "h&m", name: "H&M" },
    { id: "zara", name: "zara" },
    { id: "other", name: "other" },
  ];

  const categoryFilter = [
    { id: "men", name: "Men" },
    { id: "women", name: "Women" },
    { id: "kids", name: "Kids" },
    { id: "accessories", name: "Accessories" },
    { id: "other", name: "other" },
  ];

  // Sync filter changes to URL
  useEffect(() => {
    const params = new URLSearchParams();

    filters.brand.forEach((brand) => {
      params.append("brand", brand);
    });

    filters.category.forEach((category) => {
      params.append("category", category);
    });

    if (filters.sort) {
      params.set("sort", filters.sort);
    }
    console.log(encodeURIComponent(searchParams.toString()));
     setSearchParams(params);
     dispatch(fetchAllShopProduct(searchParams));
  }, [filters, setSearchParams,dispatch]);

  useEffect(() => {
    dispatch(fetchAllShopProduct(searchParams));
  }, [dispatch]);

  return (
    <div className="w-screen flex relative">
      <div className="w-1/6 pl-5 border-r-2 flex flex-col ">
        <h1 className="mb-5 text-5xl">Filters</h1>
        <div className="mb-7">
          <h3 className="text-3xl font-bold mb-2">Brand</h3>
          {brandFilter.map((brand) => {
            return (
              <div key={brand.id}>
                <div className="flex items-center">
                  <Input
                    className="mr-2 w-5 h-5 bg-white"
                    checked={filters.brand.includes(brand.id)}
                    onChange={() => {
                      if (filters.brand.includes(brand.id)) {
                        setFilters({
                          ...filters,
                          brand: filters.brand.filter((id) => id !== brand.id),
                        });
                      } else {
                        setFilters({
                          ...filters,
                          brand: [...filters.brand, brand.id],
                        });
                      }
                    }}
                    type="checkbox"
                    id={brand.id}
                  />
                  <Label className="text-xl cursor-pointer" htmlFor={brand.id}>
                    {brand.name}
                  </Label>
                </div>
              </div>
            );
          })}
        </div>
        <div>
          <h3 className="text-3xl font-bold mb-2">Category</h3>
          {categoryFilter.map((catagory) => {
            return (
              <div key={catagory.id}>
                <div className="flex items-center">
                  <Input
                    className="mr-2 w-5 h-5 bg-white"
                    checked={filters.category.includes(catagory.id)}
                    onChange={() => {
                      if (filters.category.includes(catagory.id)) {
                        setFilters({
                          ...filters,
                          category: filters.category.filter((id) => id !== catagory.id),
                        });
                      } else {
                        setFilters({
                          ...filters,
                          category: [...filters.category, catagory.id],
                        });
                      }
                    }}
                    type="checkbox"
                    id={catagory.id}
                  />
                  <Label className="text-xl cursor-pointer" htmlFor={catagory.id}>
                    {catagory.name}
                  </Label>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="w-full">
        <header className="flex w-full justify-between items-center  px-7 py-3 border-b-2 ">
          <div className="text-gray-500">{`Showing ${shopProduct.length} results`}</div>
          <div className="w-40">
            <Select
              className="bg-white"
              onValueChange={(e) => {
                setSort(e);
                setFilters((prev) => ({ ...prev, sort: e }));
              }}
              value={sort}
            >
              <SelectTrigger className="bg-white">
                <SelectValue placeholder="Sort" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Sort</SelectLabel>
                  <SelectItem value="Price:Low to High">Price: Low to High</SelectItem>
                  <SelectItem value="Price:High to Low">Price: High to Low</SelectItem>
                  <SelectItem value="A to Z">Title: A to Z</SelectItem>
                  <SelectItem value="Z to A">Title: Z to A</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </header>
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-5 p-5">
          {shopProduct.map((shopProduct) => (
            <div
              className="border relative rounded-md shadow-md p-3"
              key={shopProduct._id}
            >
              {shopProduct.saleprice > 0 ? (
                <div className="absolute top-0 left-0 bg-red-500 text-white font-bold p-2 rounded-tr-md rounded-br-md">
                  Sale
                </div>
              ) : (
                <div></div>
              )}
              {shopProduct.quantity < 10 ? (
                <div className="absolute top-0 right-0 bg-red-500 text-white font-bold p-2 rounded-tr-md rounded-br-md">
                  {`Only ${shopProduct.quantity} left`}
                </div>
              ) : (
                <div></div>
              )}
              <img
                className="w-96 h-60 object-cover"
                src={shopProduct.image}
                alt="image"
              />
              <h1 className="">{shopProduct.name}</h1>
              <p
                className={`${
                  shopProduct.saleprice > 0 ? "line-through text-gray-400" : ""
                }`}
              >
                {shopProduct.price}
              </p>
              <p>{shopProduct.saleprice}</p>
              <p className="">{shopProduct.quantity}</p>
              <p className="">{shopProduct.description}</p>
              <p>{shopProduct.category}</p>
              <p>{shopProduct.brand}</p>
              <div className="flex justify-between px-3">
                <Button onClick={()=>{dispatch(addToCart({productId:shopProduct._id, quantity:1, userId:user._id})).then((res)=>{
                  toast({
                    title: "Success",
                    description: res.payload.message,
                    variant: "default",
                    isClosable: true,
                    className:"bg-green-500 text-white",
                    
                  })
                  dispatch(getCart(user._id))
                })}}>Add to cart</Button>
              </div>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}

export default Productlisting;
