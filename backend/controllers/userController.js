const asyncHandler = require("express-async-handler");

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

    res.send("OK");
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