const Router = require("express")

const {createAddress,deleteAddress,updateAddress,fetchAllAddress} = require("../../controllers/shop/address.control")

const router = Router()


router.route("/shop/addaddress").post(createAddress)
router.route("/shop/getaddress/:id").get(fetchAllAddress)
router.route("/shop/updateaddress/:id").put(updateAddress)
router.route("/shop/deleteaddress/:id").delete(deleteAddress)

module.exports = router