const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const protect = asyncHandler(async (req, res, next) => {
  let token;
  /* This is checking if the request has an authorization header and if it starts with the word
    Bearer. If it does, it splits the string and takes the second part of the array.
     (Bearer token)  */
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // get token from header
      token = req.headers.authorization.split(" ")[1]; // Bearer token -> token
      // verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // Get user from the token
      req.user = await User.findById(decoded.id).select("-password"); // -password to remove the password from the response
      next();
    } catch (err) {
      console.log(err);
      res.status(401);
      throw new Error("Not authorized");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token provided");
  }
});

module.exports = {
  protect,
};
