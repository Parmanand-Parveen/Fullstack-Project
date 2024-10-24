const Router = require("express")
const fetchAllShoppingProduct = require("../../controllers/shop/shopProduct")



const  router = Router()

router.route("/shop/getproduct").get(fetchAllShoppingProduct)

module.exports = router