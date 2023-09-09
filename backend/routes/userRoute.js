const express = require("express");
const { loginUser, registerUser, getAllUser, getSingleUser, updateProfile, deleteUser,logout } = require("../controller/userController");

const {isAuthenticatedUser, authorizedRoles} = require("../middleware/auth")

const router = express.Router();

router.route("/login").post(loginUser);
router.route("/logout").get(logout);

// authonticated && authorized routes (authonticated by token && authorized by user role)
router.route("/register").post(isAuthenticatedUser,authorizedRoles("admin"),registerUser);
router.route("/user/:id").get(isAuthenticatedUser,authorizedRoles("admin","user"), getSingleUser);
router.route("/user/:id").delete(isAuthenticatedUser,authorizedRoles("admin"), deleteUser);


// unauthonticated && unauthorized routes used for react app 
router.route("/users").get( getAllUser);
router.route("/user/:id").put(updateProfile);

module.exports = router;