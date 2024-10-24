const { createProduct, handleImageUpload, readProducts, deleteProduct, updateProduct } = require("../../controllers/admin/product.control")
const Router = require("express")

const {upload} = require("../../utils/cloudinary")

const router = Router()


router.route("/create/product").post(createProduct)
router.route("/upload-image").post(upload.single("my_file"),handleImageUpload)
router.route("/read/products").get(readProducts)
router.route("/delete/products/:id").delete(deleteProduct)
router.route("/update/products/:id").put(updateProduct)


module.exports = router