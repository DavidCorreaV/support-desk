const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const protect = asyncHandler(async(req, res, next) => {
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            //Get token from headers
            token = req.headers.authorization.split(" ")[1];

            //Verify token

            const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

            //Get user from decoded token

            req.user = await User.findById(decodedToken.id).select("-password");
            next();
        } catch (error) {
            res.status(401);
            throw new Error(`${error.message} ERROR. Unauthorized`);
        }
    }

    if (!token) {
        res.status(401);
        throw new Error(`ERROR. Unauthorized`);
    }
});

module.exports = { protect };