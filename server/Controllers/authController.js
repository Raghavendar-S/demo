const { hashPassword, comparePassword } = require("../Utils/authUtils");
const UserModel = require("../Models/UserSchema");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const registerController = async (req, res) => {
  try {
    const { name, email, phone, password, role } = req.body;
    if (!name) {
      return res.send({ error: "Name is required" });
    }
    if (!email) {
      return res.send({ error: "Email is required" });
    }
    if (!phone) {
      return res.send({ error: "Phone is required" });
    }
    if (!password) {
      return res.send({ error: "Password is required" });
    }
    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      return res.status(201).send({
        success: false,
        message:
          "The email is already registered.Please login with another email",
      });
    }

    const hashedPassword = await hashPassword(password);
    const newUser = new UserModel({
      name,
      email,
      phone,
      password: hashedPassword,
      role,
    });
    await newUser.save();
    res.status(201).send({
      success: true,
      message: "Registration is done successfully",
      newUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Registration",
      error,
    });
  }
};

//Login || Method POST
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or password",
      });
    }
    if (!user) {
      return res.status(201).send({
        success: false,
        message: "Email is not registered",
      });
    }
    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      return res.status(201).send({
        success: false,
        message: "Password mismatch",
      });
    }
    const token = await jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: "3hr",
    });
    const cart = [];
    res.status(200).send({
      success: true,
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
      token,
      cart,
    });
  } catch (error) {
    res
      .status(500)
      .send({ success: false, message: "Error logging in", error });
  }
};

function sendEmail({ recipient_email, OTP }) {
  return new Promise((resolve, reject) => {
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MY_EMAIL,
        pass: process.env.MY_PASSWORD,
      },
    });

    const mail_configs = {
      from: process.env.MY_EMAIL,
      to: recipient_email,
      subject: "Karur Polymers Password Recovery OTP",
      html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>RESET OTP Email </title>
</head>
<body>
<!-- partial:index.partial.html -->
<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
  <div style="margin:50px auto;width:70%;padding:20px 0">
    <div style="border-bottom:1px solid #eee">
      <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Karur Polymers</a>
    </div>
    <p style="font-size:1.1em">Hi,</p>
    <p>Use the following OTP to complete your Password Recovery Procedure. OTP is valid for 5 minutes</p>
    <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${OTP}</h2>
    <p style="font-size:0.9em;">Regards,<br />Karur Polymers</p>
    <hr style="border:none;border-top:1px solid #eee" />
    <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
      <p>Karur Polymers</p>
      <p>29 A, 1st Cross Rd, near VRL Transports, </p>
      <p>Karur, Tamil Nadu-639002, India</p>
    </div>
  </div>
</div>
<!-- partial -->
</body>
</html>`,
    };
    transporter.sendMail(mail_configs, function (error, info) {
      if (error) {
        console.log(error);
        return reject({ message: `An error has occured` });
      }
      return resolve({ message: "Email sent succesfuly" });
    });
  });
}

const forgotPasswordController = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.send({ error: "Email is required" });
    }

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(201).send({
        success: false,
        message: "Email is not found",
      });
    }else{
      return res.status(200).send({
        success:true,
        message: "Email is verified",
      })
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong while verifying email",
      error,
    });
  }
};

const recoveryEmailController = (req, res) => {
  sendEmail(req.body)
    .then((response) => res.send(response.message))
    .catch((error) => res.status(500).send(error.message));
};

const updateProfileController = async (req, res) => {
  try {
    const { name, password, phone } = req.body;
    const user = await UserModel.findById(req.user.userId);
    
    if (password && password.length < 6) {
      return res.json({ error: "Passsword is required and 6 character long" });
    }
    const hashedPassword = password ? await hashPassword(password) : undefined;
    const updatedUser = await UserModel.findByIdAndUpdate(
      req.user.userId,
      {
        name: name || user.name,
        password: hashedPassword || user.password,
        phone: phone || user.phone,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Profile Updated Successfully",
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      message: "Error while updating profile",
      error,
    });
  }
};

const resetPasswordController = async(req,res) => {
  try {
    const { email, password } = req.body;
    if (!email) {
      return res.send({ error: "Email is required" });
    }
    if(!password){
      return res.send({ error: "Password is required" });
    }

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(201).send({
        success: false,
        message: "Email is not found",
      });
    }else{
      const hashedPassword = await hashPassword(password);
      user.password = hashedPassword; 
      await user.save();

      res.status(200).send({
        success: true,
        message: "Password updated successfully",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong while updating password",
      error,
    });
  }
};

const getUserController = async(req,res) => {
  try{
      const users = await UserModel.find()
      res.status(200).send({success:true,message:"All users retrieved",users})
  }catch(error){
      res.send({error:'Unable to get users'})
  }
};


module.exports = {
  loginController,
  registerController,
  forgotPasswordController,
  updateProfileController,
  recoveryEmailController,
  resetPasswordController,
  getUserController
};
