const {registerUser,loginUser,logoutUser, checkAuth} = require("../controllers/user.control")
const Router = require("express")

const router = Router()

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logoutUser); 
router.route("/checkAuth").get(checkAuth);

module.exports = router