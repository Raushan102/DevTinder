const { Router } = require("express");
const requestController = require("../../controller/request");
const router = Router();
const authController = require("../../controller/auth");

router.post(
  "/send/:status/:toUserId",
  authController.auth,
  requestController.handleConnectionRequest
);
router.post(
  "/review/:status/:connectionId",
  authController.auth,
  requestController.reviewConnectionRequest
);
router.get(
  "/connectedDeveloper",
  authController.auth,
  requestController.getConnectedDeveloper
);
module.exports = router;
