const {Router}=require('express')
const profileController=require('../../controller/profile')
const authContoller=require('../../controller/auth')

const router=Router();

router.patch("/edit",authContoller.auth,profileController.updateUser);
router.get("/view",authContoller.auth,profileController.getProfile);


module.exports=router;
