const {registerUser} = require("../controllers/user.control")
const Router = require("express")

const router = Router()

router.route("/register").post(registerUser);

module.exports = router