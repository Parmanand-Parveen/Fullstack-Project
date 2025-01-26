import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Autoplay from "embla-carousel-autoplay"
import { Button } from '@/components/ui/button'
import { BabyIcon, ChartBar, WatchIcon } from 'lucide-react'
import { MdMan, MdWoman } from 'react-icons/md'
import { Link, NavLink } from 'react-router-dom'
function Home2() {
  const img =useSelector(state=>state.featureImg.featureImg)  
  const [currentIndex, setCurrentIndex] = useState(0);

 const shopByCatagoryOption = [

  {id:1, name:"Men", path:"/home/productlisting?category=men",icon:<MdMan/>},
  {id:2, name:"Women", path:"/home/productlisting?category=women",icon:<MdWoman/>},
  {id:3, name:"Kids", path:"/home/productlisting?category=kids",icon:<BabyIcon/>},
  {id:4, name:"Accessories", path:"/home/productlisting?category=accessories",icon:<WatchIcon/>},
  {id:5, name:"Sale", path:"/home/productlisting?category=other",icon:<ChartBar/>},
 ]


// Handlers for navigation
const prevSlide = () => {
  setCurrentIndex((prevIndex) => (prevIndex === 0 ? img.length - 1 : prevIndex - 1));
};

const nextSlide = () => {
  setCurrentIndex((prevIndex) => (prevIndex === img?.length - 1 ? 0 : prevIndex + 1));
};

  return (
   <>
   <div className="relative w-screen  h-[500px] ">
   {/* Carousel Images */}
   <div className=" rounded-lg w-screen ">
     <img
     src={img?.[currentIndex]?.img}
     alt={`Slide ${currentIndex + 1}`}
     className="w-screen h-[500px] transition-transform object-cover duration-500 ease-in-out"
     />
   
   </div>

   {/* Navigation Buttons */}
   <button
     onClick={prevSlide}
     className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-lg hover:bg-gray-700"
   >
     &#10094; {/* Left Arrow */}
   </button>
   <button
     onClick={nextSlide}
     className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-lg hover:bg-gray-700"
   >
     &#10095; {/* Right Arrow */}
   </button>

   {/* Dots for Slide Indicators */}
   <div className="flex justify-center mt-4 space-x-2">
     {img?.map((_, index) => (
       <Button
         key={index}
         onClick={() => setCurrentIndex(index)}
         className={ `p-0 h-3 w-3 ${
           currentIndex === index ? "bg-blue-500" : "bg-gray-400"
         }`}
       ></Button>
     ))}
   </div>
 </div>
 <p className='text-center my-9 text-5xl font-bold'>Shop by Catagory</p>
    <div className='lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3  w-full grid'>
     {shopByCatagoryOption.map((item)=>{
      return(
        <Button className='m-2 h-28  bg-white text-black border-2 hover:bg-white dark:bg-gray-700 dark:text-white' key={item.id} asChild>
        <NavLink  className='flex flex-col' to={item.path}>
         <div className='text-3xl'>{item.icon}</div>
         <p> {item.name}</p>
        </NavLink>
      </Button>
      )
     })}  
    
    </div>

   </>
  )
}

export default Home2