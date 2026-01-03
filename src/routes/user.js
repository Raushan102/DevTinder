const express=require('express');
const UserContoller=require('../../controller/user')
const authContoller =require('../../controller/auth')
const router= express.Router()


router.get("/user",authContoller.auth ,UserContoller.getUser);
router.delete("/user",authContoller.auth, UserContoller.deleteUser);



module.exports=router;
