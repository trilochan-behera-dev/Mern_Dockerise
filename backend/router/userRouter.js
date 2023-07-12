const express = require("express");

const router = express.Router();
const userController = require("../controller/userController");

router.get("/getUser", userController.getUser);
router.post("/signup", userController.createUser);
router.post("/login", userController.loginUser);
router.put(
  "/updateUser",
  userController.verifyToken,
  userController.updateUser
);

module.exports = router;
