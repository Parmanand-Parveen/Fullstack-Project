const Router = require("express")
const { uploadFeatureImgURL, getAllFeatureImg, deleteFeatureImg } = require("../../controllers/admin/featuredimg.control")

const router = Router()


router.route("/create/featureimage").post(uploadFeatureImgURL)
router.route("/get/featureimage").get(getAllFeatureImg)
router.route("/delete/featureimage/:id").delete(deleteFeatureImg)

module.exports = router