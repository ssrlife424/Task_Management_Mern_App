const jwt = require("jsonwebtoken");
const user = require("../models/user");
require("dotenv").config();

const userAuthVerification = async (req, res) => {
  const token = req.cookies.token;
  console.log(token, "token");
  if (!token) {
    return res.json({
      success: false,
      message: "Token is not available or Invalid Token",
    });
  }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log(decoded, "decoded");
      const userInfo = await user.findById(decoded.getId);
      console.log(userInfo, "userInfo");

      if (userInfo) {
        return res.status(200).json({
          success: true,
          userInfo,
        });
      }else{
        return res.status(404).json({
          success: false,
          message: "User not found"
        })
      }
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }
  }

module.exports = { userAuthVerification };
