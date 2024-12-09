import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { addAddress, deleteAddress, fetchAllAddress } from "@/Store/shop/addressSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function Address() {
  const dispatch = useDispatch();
  const addresses = useSelector((state) => state.address);
  const user = JSON.parse(localStorage.getItem("user"));
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchAllAddress(user._id));
  }, [dispatch]);

  const [formData, setFormData] = useState({
    userId:user._id,
    name: "",
    address: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
    phone: "",
  });
  const handleAddAddress = () => {
    // Dispatch action to add a new address (e.g., open a modal or navigate to an Add Address page)
    console.log("Add new address");
  };

  const handleEditAddress = (id) => {
    // Dispatch action to edit the address with the given id
    console.log("Edit address:", id);
  };

  const handleDeleteAddress = (id) => {
    // Dispatch action to delete the address with the given id
    console.log("Delete address:", id);
  };

  return (
    <div className="h-screen w-screen flex flex-col py-4 p-6">
      <h1 className="text-2xl font-bold text-black mb-4">Your Addresses</h1>

      <button
        onClick={() => {
          setDialogOpen(true);
        }}
        className="mb-4 px-4 py-2 self-end  bg-blue-600 text-white rounded hover:bg-blue-500"
      >
        Add New Address
      </button>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="bg-gray-700">
          <DialogTitle className="text-white">Add new Address</DialogTitle>
          <form action="" >
            <Label className="text-white">Name</Label>
            <Input placeholder="Aman" value={formData.name} onChange={(e)=>{setFormData({...formData,name: e.target.value})}}/>
            <Label className="text-white">Address</Label>
            <Input value={formData.address}  onChange={(e)=>{setFormData({...formData,address: e.target.value})}}/>
            <Label className="text-white">Mobile No:</Label>
            <Input  type="number" value={formData.phone}  onChange={(e)=>{setFormData({...formData,phone: e.target.value})}}/>
            <div className="flex justify-between">
              <div>
                <Label className="text-white">City</Label>
                <Input value={formData.city}  onChange={(e)=>{setFormData({...formData,city: e.target.value})}}/>
              </div>
              <div>
                <Label className="text-white">Pincode</Label>
                <Input type="number" value={formData.pincode}  onChange={(e)=>{setFormData({...formData,pincode: e.target.value})}}/>
              </div>
            </div>
            <div className="flex justify-between">
              <div>
                <Label className="text-white">State</Label>
                <Input value={formData.state}  onChange={(e)=>{setFormData({...formData,state: e.target.value})}} />
              </div>
              <div>
                <Label className="text-white">Country</Label>
                <Input value={formData.country}  onChange={(e)=>{setFormData({...formData,country: e.target.value})}}/>
              </div>
            </div>
            <Button className="w-full mt-4"  onClick={()=>{dispatch(addAddress(formData))}}>Submit</Button>
          </form>
        </DialogContent>
      </Dialog>
      <div className="w-full max-w-3xl grid grid-cols-1 md:grid-cols-2 gap-4">
        {addresses?.addresses?.length > 0 ? (
          addresses.addresses.map((address) => (
            <div
              key={address.id}
              className="p-4 rounded shadow-md flex flex-col"
            >
              <h2 className="text-lg font-bold mb-2">{address.name}</h2>
              <p className="text-gray-600 mb-2">{address.phone}</p>
              <p className="text-gray-600 mb-2">{address.address}</p>
              <p className="text-gray-600 mb-2">
                {address.city}, {address.state} - {address.pincode}
              </p>
              <p className="text-gray-600 mb-4">{address.country}</p>
              <div className="flex justify-between">
              
                <button
                  onClick={() =>
                    dispatch(deleteAddress(address._id)).then(
                          dispatch(fetchAllAddress(user._id))
                    )
                  }
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-400"
                >
                  Delete
                </button>

                <button
                onClick={() => handleEditAddress(address._id)}
                className="px-3 py-1 bg-yellow-500 hidden text-white rounded hover:bg-yellow-400"
              >
                Edit
              </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-white">
            No addresses found. Add a new address to get started.
          </p>
        )}
      </div>
    </div>
  );
}

export default Address;
