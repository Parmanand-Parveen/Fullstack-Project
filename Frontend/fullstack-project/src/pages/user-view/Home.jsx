import { ModeToggle } from "@/components/theme/mode-toggle";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useToast } from "@/hooks/use-toast";
import { fetchAllAddress } from "@/Store/shop/addressSlice";
import {
  addToCart,
  clearCart,
  getCart,
  removeCartItem,
} from "@/Store/shop/cart";
import {
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import {
  EyeIcon,
  Heart,
  HeartIcon,
  HomeIcon,
  ListOrderedIcon,
  LogOut,
  LogOutIcon,
  SeparatorHorizontal,
  ShoppingBasket,
  Trash,
  UserRoundCheckIcon,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { json, Navigate, NavLink, Outlet, useNavigate } from "react-router-dom";

const homeheader = [
  { id: 1, name: "Home", path: "/home/productlisting" },
  { id: 2, name: "Men", path: "/home/productlisting?category=men" },
  { id: 3, name: "Women", path: "/home/productlisting?category=women" },
  { id: 4, name: "Kids", path: "/home/productlisting?category=kids" },
  { id: 5, name: "Accessories", path: "/home/productlisting?category=accessories" },
  { id: 6, name: "Sale", path: "/home/productlisting?category=other" },
];

function Home() {
  const user = JSON.parse(localStorage.getItem("user"));
  const cartItem = useSelector((state) => state.userCart);
  //  console.log(cartItem.cartItems.length)
  const dispatch = useDispatch();
  const [cartOpen, setCartopen] = useState(false);
  const toast = useToast();
  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("user");
    window.location.reload();
    // navigate("/auth/login");
  };
  const navigate = useNavigate();
  return (
    <div className="flex flex-col ">
      <header className="flex w-full justify-between items-center px-5 py-3 border-b sticky border-zinc-700">
        <div
          className="flex items-center gap-2 text-2xl font-bold"
          onClick={() => navigate("/home")}
        >
          <HomeIcon />
          E-Commerce
        </div>
        <div className="lg:flex hidden items-center gap-5 dark:text-white  ">
          {homeheader.map((item) => (
            <NavLink  
            key={item.id}
            to={item.path}
            
              className="text-black font-bold hover:text-black dark:text-white"
            >
              {item.name}
            </NavLink>
          ))}
        </div>
        <div className="flex items-center gap-2">
        <ModeToggle/>
          <div className="relative">
            <ShoppingBasket
              onClick={() => {
                setCartopen(true);
                dispatch(getCart(user._id));
              }}
            />
            <Sheet open={cartOpen} onOpenChange={setCartopen}>
              <SheetContent side="right" className="overflow-y-auto">
                <SheetHeader className="text-2xl font-bold">Cart</SheetHeader>
                <h1
                  className="text-lg text-right underline cursor-pointer text-gray-500"
                  onClick={() => {
                    dispatch(clearCart({ userId: user._id }));
                  }}
                >
                  Clear cart
                </h1>
                {cartItem?.cartItems?.map((item) => (
                  <div className="">
                    <div
                      key={item?._id}
                      className=" lg:flex lg:h-24 lg:overflow-hidden  relative mt-3 p-2 lg:justify-between lg:items-center shadow-md "
                    >
                      <Trash
                        className="absolute right-0 top-0 bg-red-500 p-1 rounded-full text-white h-5 w-5"
                        onClick={() => {
                          dispatch(
                            removeCartItem({
                              productId: item?.product?._id,
                              userId: user._id,
                            })
                          ).then((res) => {
                            dispatch(getCart(user._id));
                          });
                        }}
                      />
                      <img
                        className=" w-full lg:w-24 object-cover"
                        src={item?.product?.image}
                      />
                      <div>
                        <p className="text-lg font-bold">
                          {item?.product?.name}
                        </p>
                        <p className="text-xs">
                          ₹
                          {`${item?.product?.saleprice>0?item?.product?.saleprice: item?.product?.price }x${item?.quantity}=₹${
                           ( item?.product?.saleprice > 0 ? item?.product?.saleprice : item?.product?.price ) * item?.quantity
                          }`}
                        </p>
                      </div>
                      <div className="flex gap-2 items-center">
                        <Button
                          disabled={item.quantity <= 1}
                          className={`${
                            item?.quantity < 1
                              ? "cursor-not-allowed"
                              : "cursor-pointer"
                          }`}
                          onClick={() => {
                            dispatch(
                              addToCart({
                                productId: item.product._id,
                                quantity: -1,
                                userId: user._id,
                              })
                            ).then((res) => {
                              dispatch(getCart(user._id));
                            });
                          }}
                        >
                          -
                        </Button>
                        <p> {item?.quantity}</p>
                        <Button
                          onClick={() => {
                            dispatch(
                              addToCart({
                                productId: item.product._id,
                                quantity: 1,
                                userId: user._id,
                              })
                            ).then((res) => {
                              dispatch(getCart(user._id));
                            });
                          }}
                        >
                          +
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
                <Separator className="my-5 w-full " />
                <div className="flex justify-between">
                  <p>Total</p>
                  <p>
                    ₹
                    {cartItem?.cartItems?.reduce(
                      (acc, item) =>
                        acc + ( item?.product?.saleprice > 0 ? item?.product?.saleprice : item?.product?.price )* item?.quantity,
                      0
                    )}{" "}
                  </p>
                </div>
                <Separator className="my-5 w-full" />
                <Button
                  className="w-full"
                  onClick={() =>{ navigate("/home/checkout")
                    setCartopen(false) }
                  }
                >
                  Checkout
                </Button>
              </SheetContent>
            </Sheet>
            <span className="text-xl font-bold text-red-500  absolute top-[-10px] right-[7px] z-[-10] ">
              {cartItem?.cartItems?.length}
            </span>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar>
                <AvatarFallback className="bg-black dark:bg-white dark:text-black text-white text-xl">
                  {user.username[0].toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>MY Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex gap-2 ">
                <NavLink
                  to={"/home/useraccount"}
                  className="text-black hover:text-black flex gap-2 items-center dark:text-white"
                >
                  <UserRoundCheckIcon /> Profile
                </NavLink>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex gap-2 "
                onClick={() => navigate("/home/order")}
              >
                <ListOrderedIcon /> Orders
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex gap-2 "
                onClick={() => navigate("/home/wishlist")}
              >
                <HeartIcon /> Wishlist
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex gap-2 "
                onClick={() => {
                  dispatch(fetchAllAddress(user._id))
                  navigate("/home/address")
                  }
                }
              >
                <EyeIcon /> Address
              </DropdownMenuItem>
              <DropdownMenuItem className="flex gap-2" onClick={handleLogout}>
                <LogOutIcon /> Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      <Outlet />
    </div>
  );
}

export default Home;
