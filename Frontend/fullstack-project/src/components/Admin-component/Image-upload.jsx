import { Label } from '@radix-ui/react-label'
import React, { useRef, useState } from 'react'
import { Input } from '../ui/input'
import { UploadCloudIcon, XIcon } from 'lucide-react'

function Imageupload({uploadImg, setUploadImg}) {
  

    const inputref= useRef(null)
  return (
    <div >
       <div className='flex justify-center items-center border-2 border-dashed p-5'>
       {uploadImg ? (
         <div className='flex flex-col items-center gap-3'>
         <img src={URL.createObjectURL(uploadImg)} alt="" className="w-24 h-24 object-cover rounded-md " />
         {uploadImg.name}
           <button
             className=" px-3 py-2 rounded-md flex bg-red-500"
             onClick={() => setUploadImg(null)}
           >
             <XIcon className='text-white bg-red-500'/>
           </button>
         </div>

       ) : (
         <div
           className="flex flex-col items-center justify-center gap-2 cursor-pointer"
           onClick={() => inputref.current.click()}
         >
           <UploadCloudIcon size={50} />
           <p>Upload Image</p>
         </div>
       )}
       <Input className="hidden" id="image" type="file" ref={inputref} onChange={(e)=>setUploadImg(e.target.files[0])}/>
       </div>
       
    </div>
  )
}

export default Imageupload