const featuredImgModel = require("../../models/featuredimg.model");



const uploadFeatureImgURL = async(req,res)=>{
  const {featuredImgURL} = req.body
  try {
    const result = await featuredImgModel.create({img:featuredImgURL})
    res.json({success:true,result}) 
     .status(200) 


  } catch (error) {
    console.log(error)
    res.json({success:false,message:"Error occured while uploading the image"}).status(400)
  }

}

const getAllFeatureImg = async(req,res)=>{
  try {
    const result = await featuredImgModel.find({})
    res.json({success:true,result})
  } catch (error) {
    console.log(error)
    res.json({success:false,message:"Error occured while fetching the images"})
  }
}

const deleteFeatureImg = async(req,res)=>{
  try {
    const result = await featuredImgModel.findByIdAndDelete(req.params.id)
    res.json({success:true,result})
  } catch (error) {
    console.log(error)
    res.json({success:false,message:"Error occured while deleting the image"})
  }
}

module.exports = {uploadFeatureImgURL,getAllFeatureImg,deleteFeatureImg}