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
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useToast } from "@/hooks/use-toast";
import { addToCart, getCart } from "@/Store/shop/cart";
import { fetchAllShopProduct } from "@/Store/shop/shopProduct";
import { MenuIcon } from "lucide-react";
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
  

  const [setFilterSideBar, setSetFilterSideBar] = useState(false)

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

  const params = new URLSearchParams();
  // Sync filter changes to URL
  useEffect(() => {

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
     dispatch(fetchAllShopProduct(searchParams));
  }, [filters, setSearchParams,dispatch]);

  useEffect(() => {
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
  }, [filters,dispatch]);

  useEffect(() => {
    dispatch(fetchAllShopProduct(searchParams));
  }, [dispatch]);

  return (
    <div className="w-screen flex relative">
    
      
      <Sheet  open={setFilterSideBar} onOpenChange={setSetFilterSideBar} >
      <SheetContent side="left">
      <div className="w-1/6 pl-5  flex flex-col ">
      <h1 className="mb-5 text-5xl">Filters</h1>
      <div className="mb-7">
        <h3 className="text-3xl font-bold mb-2">Brand</h3>
        {brandFilter.map((brand) => {
          return (
            <div key={brand.id}>
              <div className="flex items-center ">
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
      </SheetContent>
      </Sheet>
       
      <div className="w-1/6 pl-5 border-r-2 lg:flex flex-col hidden">
        <h1 className="mb-5 text-5xl">Filters</h1>
        <div className="mb-7">
          <h3 className="text-3xl font-bold mb-2">Brand</h3>
          {brandFilter.map((brand) => {
            return (
              <div key={brand.id}>
                <div className="flex items-center ">
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
      <div className="w-full ">
        <header className="flex w-full justify-between items-center  px-7 py-3 border-b-2 ">
        <MenuIcon className="lg:hidden" onClick={()=>{setSetFilterSideBar(true)}}/>
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
              <SelectTrigger className="bg-white dark:bg-black">
                <SelectValue placeholder="Sort" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Sort</SelectLabel>
                  <SelectItem value="price:asc">Price: Low to High</SelectItem>
                  <SelectItem value="price:dsc">Price: High to Low</SelectItem>
                  <SelectItem value="A to Z">Title: A to Z</SelectItem>
                  <SelectItem value="Z to A">Title: Z to A</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </header>
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6 h-screen overflow-y-scroll bg-gray-100 dark:bg-gray-900">
        {shopProduct.map((shopProduct) => (
          <div
            className="border relative rounded-lg shadow-lg h-max bg-white dark:bg-gray-800 p-4 transition-transform transform hover:scale-105"
            key={shopProduct._id}
          >
            {/* Sale Badge */}
            {shopProduct.saleprice > 0 && (
              <div className="absolute top-0 left-0 bg-red-500 text-white text-sm font-semibold px-3 py-1 rounded-tr-lg rounded-br-lg">
                Sale
              </div>
            )}
      
            {/* Low Quantity Badge */}
            {shopProduct.quantity < 10 && (
              <div className="absolute top-0 right-0 bg-yellow-500 text-white text-sm font-semibold px-3 py-1 rounded-tl-lg rounded-bl-lg">
                Only {shopProduct.quantity} left
              </div>
            )}
      
            {/* Product Image */}
            <img
              className="w-full h-52 object-cover rounded-lg mb-4"
              src={shopProduct.image}
              alt={shopProduct.name}
            />
      
            {/* Product Details */}
            <h1 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-2 truncate">
              {shopProduct.name}
            </h1>
            <div className="flex items-center gap-2">
              <p
                className={`text-sm ${
                  shopProduct.saleprice > 0
                    ? "line-through text-gray-400 dark:text-gray-500"
                    : "text-gray-800 dark:text-gray-300"
                }`}
              >
                ₹{shopProduct.price}
              </p>
              {shopProduct.saleprice > 0 && (
                <p className="text-sm font-bold text-red-600 dark:text-red-400">
                  ₹{shopProduct.saleprice}
                </p>
              )}
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
              {shopProduct.description.slice(0, 50)}...
            </p>
            <p className="text-xs text-gray-400 dark:text-gray-500 mb-1">
              Category: {shopProduct.category}
            </p>
            <p className="text-xs text-gray-400 dark:text-gray-500 mb-3">
              Brand: {shopProduct.brand}
            </p>
      
            {/* Add to Cart Button */}
            <div className="flex justify-center mt-4">
              <Button
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 flex-grow transition-all"
                onClick={() => {
                  dispatch(
                    addToCart({
                      productId: shopProduct._id,
                      quantity: 1,
                      userId: user._id,
                    })
                  ).then((res) => {
                    toast({
                      title: "Success",
                      description: res.payload.message,
                      variant: "default",
                      isClosable: true,
                      className: "bg-green-500 text-white",
                    });
                    dispatch(getCart(user._id));
                  });
                }}
              >
                Add to Cart
              </Button>
            </div>
          </div>
        ))}
      </section>
      
      
      </div>
    </div>
  );
}

export default Productlisting;
