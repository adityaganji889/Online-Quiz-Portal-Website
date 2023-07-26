const router = require("express").Router()
const {register, login, getUserInfo, sendPasswordResetLink, resetPassword, updateProfile} = require("../controllers/userControllers")
const authMiddleware = require("../middlewares/authMiddleware")

router.post('/register',register)
router.post('/login',login)
router.post('/get-user-info',authMiddleware,getUserInfo)
router.post("/send-password-reset-link",sendPasswordResetLink);
router.post("/reset-password",resetPassword);
router.put("/update-user-info",authMiddleware,updateProfile);


module.exports = router