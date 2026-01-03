const { Router } = require("express");
const authController=require('../../controller/auth')

const router = Router();

router.post("/signup", authController.signUp);
router.post("/login", authController.login);
router.post('/logout',authController.logout)

module.exports = router;
