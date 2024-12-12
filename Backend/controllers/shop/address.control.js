const addressModel = require("../../models/address.model")
const userModel = require("../../models/user.model")



const createAddress = async(req,res)=>{
    const {name,userId,address,city,state,country,pincode,phone} = req.body
     try {
        const createdAddress = await addressModel.create({name,userId,address,city,state,country,pincode,phone})
        res.json({success:true,message:"Address created successfully",createdAddress}).status(202)
     } catch (error) {
        if(error){
            res.json({success:false,message:"Error occured while creating the address"}).status(400)
        }
     }
  
}


const deleteAddress = async(req,res)=>{
    const {id} = req.params
    try {
        const deletedAddress = await addressModel.findByIdAndDelete(id)
    res.json({success:true,message:"Address deleted successfully",deletedAddress}).status(202)
    } catch (error) {
        if(error){
            res.json({success:false,message:"Error occured while deleting the address"}).status(400)
        }
    }
} 


const updateAddress = async(req,res)=>{
    const {id} = req.params
    const {name,address,city,state,country,pincode,phone} = req.body
    try {
        const updatedAddress = await addressModel.findByIdAndUpdate(id,{name,address,city,state,country,pincode,phone},{new:true})
        res.json({success:true,message:"Address updated successfully",updatedAddress}).status(202)
    } catch (error) {
        if(error){
            res.json({success:false,message:"Error occured while updating the address"}).status(400)
        }
    }}

   const fetchAllAddress = async (req, res) => {
    try {
      const userId = req.params.id;
      const address = await addressModel.find({ userId });
      res.json({ success: true, address });
    } catch (error) {
      console.log(error);
      res.json({ success: false, message: "Error occured while fetching the address" });
    }
   } 


module.exports = {createAddress,deleteAddress,updateAddress,fetchAllAddress}