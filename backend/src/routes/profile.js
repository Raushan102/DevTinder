const {Router}=require('express')
const profileController=require('../../controller/profile')
const authContoller=require('../../controller/auth')
const upload=require('../../config/multer')
const router=Router();

router.patch("/edit",authContoller.auth,profileController.updateUser);
router.get("/view",authContoller.auth,profileController.getProfile);
router.post('/upload-profile-pic',authContoller.auth,upload.single('profilePicture'),profileController.profilePictureUpload)


module.exports=router;
