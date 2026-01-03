const { Router } = require("express");
const requestController=require('../../controller/request')
const router = Router();
const authController=require('../../controller/auth')

router.post("/send/:status/:toUserId",authController.auth, requestController.handleConnectionRequest);

module.exports=router;
