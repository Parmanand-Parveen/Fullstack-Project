const {registerUser,loginUser,logoutUser} = require("../controllers/user.control")
const Router = require("express")

const router = Router()

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(logoutUser); 

module.exports = router