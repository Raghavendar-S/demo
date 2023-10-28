const jwt = require('jsonwebtoken')
const User = require("../Models/UserSchema")

const requireSignIn = async (req, res, next) => {
    try {
      const decode = jwt.verify(
        req.headers.authorization,
        process.env.SECRET_KEY
      );
      req.user = decode;
      next();
    } catch (error) {
      console.log(error);
    }
  };
  
//admin acceess
const isAdmin = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.userId);
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized Access: User not found",
            });
        }
        if (user.role !== 1) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized Access: Insufficient privileges",
            });
        }
        next();
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error in admin middleware",
            error
        });
    }
};

module.exports = {requireSignIn,isAdmin};