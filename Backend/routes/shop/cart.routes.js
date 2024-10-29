const Router = require("express")
const { addToCart, getCart, removeFromCart, clearCart } = require("../../controllers/shop/cart")

const router = Router()


router.route("/shop/addtocart").post(addToCart)
router.route("/shop/getcart/:id").get(getCart)
router.route("/shop/deletecart/item").delete(removeFromCart)
router.route("/shop/clearcart").delete(clearCart)

module.exports = router