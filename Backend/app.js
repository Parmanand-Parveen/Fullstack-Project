const express = require("express")
const userRouter = require("./routes/user.routes")
const productRouter = require("./routes/admin/product.routes")
const shopProductRouter = require("./routes/shop/product.routes")
const cartRoute = require("./routes/shop/cart.routes")
const featuredimgRoute = require("./routes/admin/featureImage.routes")
const addressRouter = require("./routes/shop/address.routes")
const mongoose = require("mongoose")
const cookieParser = require("cookie-parser")
const dotenv= require("dotenv").config()
const cors = require("cors")

const  {MONGO_DB_SERVER} = process.env

const app = express()


  app.use(
    cors({
      origin: "https://e-commerce-sigma-dun.vercel.app",
      methods: ["GET", "POST", "DELETE", "PUT"],
      allowedHeaders: [
        "Content-Type",
        "Authorization",
        "Cache-Control",
        "Expires",
        "Pragma",
        "someheader",
        "Access-Control-Allow-Origin"
      ],
      credentials: true,
    })
  );
  

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())


mongoose.connect(MONGO_DB_SERVER)


app.use("/api/v1",userRouter)
app.use("/api/v1",productRouter)
app.use("/api/v1",shopProductRouter)
app.use("/api/v1",cartRoute)
app.use("/api/v1",featuredimgRoute)
app.use("/api/v1",addressRouter)



app.listen(process.env.PORT,(error) => {
 if(!error){
    console.log("listening on port 3000")
 }else{
    console.log(error)
 }

}
)
