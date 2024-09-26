const {registerUser,loginUser} = require("../controllers/user.control")
const Router = require("express")

const router = Router()

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);

module.exports = router