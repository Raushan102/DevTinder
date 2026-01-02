const express=require('express');
const UserContoller=require('../../controller/user')
const router= express.Router()

router.post("/signup",UserContoller.signUp );
router.post('/login',UserContoller.login)
router.get("/user",UserContoller.auth ,UserContoller.getUser);
router.patch("/user",UserContoller.auth,UserContoller.updateUser );
router.delete("/user",UserContoller.auth, UserContoller.deleteUser);
router.get('/profile',UserContoller.auth,UserContoller.getProfile);


module.exports=router;
