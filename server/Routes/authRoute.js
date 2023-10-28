const express = require('express')
const { loginController, registerController, forgotPasswordController, updateProfileController, recoveryEmailController, resetPasswordController, getUserController} = require('../Controllers/authController');
const {requireSignIn, isAdmin} = require('../Middlewares/authMiddleware')

//router object
const router = express.Router()

//routing
//Login || Method POST
router.post('/login',loginController);

//Register || Method POST
router.post('/register',registerController)

//Forgot Password
router.post('/forgot-password', forgotPasswordController);

//Reset Password
router.put('/reset-password',resetPasswordController);

//Recovery Email
router.post('/send_recovery_email', recoveryEmailController);

//Get Users
router.get('/get-users',getUserController);

//protected user route 
router.get('/user-auth',requireSignIn, (req,res) => {
    res.status(200).send({ok:true});
})

//protected admin route 
router.get('/admin-auth',requireSignIn, isAdmin, (req,res) => {
    res.status(200).send({ok:true});
})

//update profile
router.put('/profile', requireSignIn, updateProfileController);

module.exports = router;