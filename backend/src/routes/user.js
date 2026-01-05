const express = require("express");
const userController = require("../../controller/user");
const authcontroller = require("../../controller/auth");
const router = express.Router();

router.get("/user/requests/receive", authcontroller.auth, userController.getRequest);
router.get('/user/connection',authcontroller.auth,userController.getConnection);
router.get('/user/feeds',authcontroller.auth,userController.getFeeds);

module.exports = router;
