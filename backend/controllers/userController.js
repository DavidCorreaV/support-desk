const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
//@desc Registration of new account
//@route /api/users
//@access Public

const registerUser = asyncHandler(async(req, res) => {
    const { name, email, password } = req.body;

    //Validations
    if (!name || !email || !password) {
        res.status(400);
        throw new Error("Please include all fields");
    }

    //Find if the user is already registered

    const userExists = await User.findOne({ email: email });
    if (userExists) {
        res.status(400);
        throw new Error("User already registered");
    }

    //Hash the password

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //Create user

    const user = await User.create({
        name: name,
        email: email,
        password: hashedPassword,
    });
    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
        });
    } else {
        res.status(400);
        throw new Error("Invalid user Data");
    }
});

//@desc User login
//@route /api/users/login
//@access Public
const loginUser = asyncHandler(async(req, res) => {
    res.send("Login Route");
});

module.exports = {
    registerUser,
    loginUser,
};