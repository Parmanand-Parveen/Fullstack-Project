import Imageupload from "@/components/Admin-component/Image-upload";
import { ModeToggle } from "@/components/theme/mode-toggle";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { Item } from "@radix-ui/react-dropdown-menu";
import axios from "axios";
import { Delete, LayoutDashboard, Loader, Loader2, Trash } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

function Admindashboard() {
  const [featureuploadImg, setFeatureuploadImg] = useState(null);
  const [featureuploadedImageUrl, setFeatureUploadedImageUrl] = useState(null);
  const [featuredImgURL, setFeaturedImgURL] = useState(null);
  const [featureImgLoading, setFeatureImgLoading] = useState(false);
  const { toast } = useToast();
  const dispatch = useDispatch();

  async function uploadfeatureImageToCloudinary() {
    setFeatureImgLoading(true);
    const data = new FormData();
    data.append("my_file", featureuploadImg);
    const response = await axios.post("/api/v1/upload-image", data);
    console.log(response);
    if (response?.data?.success) {
      setFeaturedImgURL(response.data.result.url);
      setFeatureImgLoading(false);
    }
  }

  useEffect(() => {
    if (featureuploadImg !== null) uploadfeatureImageToCloudinary();
  }, [featureuploadImg]);

  const clear = () => {
    localStorage.clear();
    dispatch(logout()).then(() => {
      toast({
        title: "Logout",
        description: "Logout Success",
      });
      window.location.reload();
    });
    // localStorage.setItem('isAuthenticated', 'false')
    // localStorage.setItem('user', 'null')
    navigate("/auth/login");
  };

  const featureUploadImg = async (e) => {
    const response = await axios.post("/api/v1/create/featureimage", {
      featuredImgURL,
    });
    toast({
      title: "Upload Successfull",
      description: "Image uploaded successfully",
    });
    window.location.reload();
  };

  const getAllfeatureImg = useSelector((state) => state.featureImg.featureImg);

  const deleteFeatureImg = async (id) => {
    const response = await axios.delete(`/api/v1/delete/featureimage/${id}`);
    toast({
      title: "Delete Successfull",
      description: "Image deleted successfully",
      variant: "destructive",
    });
    window.location.reload();
  };

  console.log(getAllfeatureImg);

  return (
    <div>
      <header className="flex w-full justify-between items-center px-5 py-3 border-b border-zinc-700">
        <div className="flex items-center gap-2">
          <LayoutDashboard />
          Dashboard
        </div>
        <ModeToggle />
        <NavLink
          onClick={clear}
          className="text-red-500 font-semibold text-lg px-3 py-2 rounded-md flex items-center gap-2 hover:text-red-500"
        >
          Logout
        </NavLink>
      </header>
      {featureImgLoading == true ? (
        <div className="w-full h-11 flex items-center justify-center ">
          <Loader2 className="w-6 h-6 animate-spin" />
          Loading
        </div>
      ) : (
        <Imageupload
          uploadImg={featureuploadImg}
          setUploadImg={setFeatureuploadImg}
          value={featureuploadedImageUrl}
        />
      )}
      <Button onClick={featureUploadImg}>Upload Image</Button>
      {getAllfeatureImg == null ? (
        <div className="w-full h-11 flex items-center justify-center ">
          <Loader2 className="w-6 h-6 animate-spin" />
          Loading
        </div>
      ) : (
        <div className="w-full h-11 flex gap-4 items-center justify-center ">
          {getAllfeatureImg.map((item) => (
            <div
              key={item._id}
              className=" items-center justify-center gap-2"
            >
              <img src={item.img} alt="" className=" rounded-md  h-28  w-60" />
              <Trash
                cursor="pointer"
                onClick={() => deleteFeatureImg(item._id)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Admindashboard;
