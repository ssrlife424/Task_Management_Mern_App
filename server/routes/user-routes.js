const express = require('express');
const userRouter = express.Router();


const{registerUser , loginUser, logout} = require('../controllers/use-controllers')
const { userAuthVerification}= require('../middleware/auth-middleware')

userRouter.post("/register", registerUser);
userRouter.post('/login', loginUser);
userRouter.post('/auth',userAuthVerification);
userRouter.post('/logout', logout);

module.exports  = userRouter;