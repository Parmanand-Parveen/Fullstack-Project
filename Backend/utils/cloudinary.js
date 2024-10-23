const cloudinary = require("cloudinary").v2;
const multer = require("multer") 
const dotenv= require("dotenv").config()


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const storage =new multer.memoryStorage()
async function imageUploadUtil(file) {
   try {
    const result = await cloudinary.uploader.upload(file, {
        resource_type: "auto",
      });
    
      return result;
   } catch (error) {
     console.log(error)
     res.status(400).json({success:false,message:"Image not uploaded"})
   }
  }

  const upload = multer({ storage });


module.exports = {imageUploadUtil,upload}