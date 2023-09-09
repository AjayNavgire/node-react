
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");


// Login User
exports.loginUser = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;


    // Checking if user has given password and email both
    
    if (!email || !password) {
        return next(new ErrorHandler("Please Enter Email & Password", 400));
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
        return next(new ErrorHandler("Invalid email or password", 401))
    }

    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid email or password", 401))
    }

    sendToken(user, 200, res)
})

// Logout User
exports.logout = catchAsyncError(async (req, res, next) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })

    res.status(200).json({
        success: true,
        message: "Logged Out"
    })
})
// Register a User
exports.registerUser = catchAsyncError(async (req, res, next) => {
    const { name, email, password } = req.body;

    const user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: "this is a sample id",
            url: "profilepicUrl"
        }
    });

    res.status(201).json({
        success: true,
        user
    })
})

exports.getAllUser = catchAsyncError(async(req, res, next) =>{
    const users = await User.find();

    res.status(200).json({
        success: true,
        users
    })
})

// Get single user (admin)
exports.getSingleUser = catchAsyncError(async(req, res, next) =>{

    const user = await User.findById(req.params.id);

    if(!user){
        return next (new ErrorHandler(`User does not exist with id: ${req.params.id}`))
    }

    res.status(200).json({
        success: true,
        user
    })
})

// Update User Profile
exports.updateProfile = catchAsyncError(async(req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email
    };

    const user = await User.findByIdAndUpdate(req.params.id, newUserData,{
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });
    res.status(200).json({
        success: true,
        user
    })
});

// Delete User 
exports.deleteUser = catchAsyncError(async(req, res, next) => {
    const user = await User.findById(req.params.id);
  
    if(!user){
        return next(
            new ErrorHandler(`User does not exist with Id: ${req.params.id}`)
        )
    }

    let id = {_id:req.params.id}
    await User.deleteOne(id);
  
      res.status(200).json({
          success: true,
          message: "User Deleted Successfully"
      })
  })

