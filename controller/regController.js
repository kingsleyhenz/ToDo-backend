import bcrypt from 'bcrypt'
import Reg from '../models/regmodel.js';
import genToken from '../util/tokenGen.js';
import nodemailer from "nodemailer";
import otpGenerator from "otp-generator";
import otpVerify from "otp-verify"


export const Register = async(req, res) => {
  const{name, username, email, password} = req.body;

  try{
      const foundUser = await Reg.findOne({email});
      if(foundUser){
          return res.json({status: "error", data: "User Already Exists"})
      }
      const salt = await bcrypt.genSalt(10);
      const hashpassword = await bcrypt.hash(password, salt)
      const otp = otpGenerator.generate(6, { upperCase: false, specialChars: false });
      
      const User = await Reg.create({
          name,
          username,
          email,
          password: hashpassword,
          otp
      });
      await sendConfirmationEmail(name, email, otp);
      res.json({
          status: "success",
          data: User
      })
  }catch(error){
      res.json(error.message)
  }
}


export const sendConfirmationEmail = async (name, email, otp) => {
    try {
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: "ayehenz29@gmail.com",
          pass: "29HENZPASS",
        },
      });
  
      const mailOptions = {
        from: "ayehenz29@gmail.com",
        to: email,
        subject: "Welcome to My App!",
        text: `Hi ${name},\n\nThank you for registering on My App. We're excited to have you onboard!\n\n Your otp for logging in ${otp} \n\nBest regards,\nMy App Team`,
      };
  
      await transporter.sendMail(mailOptions);
    } catch (error) {
      console.log(error.message);
    }
  };


  
  export const Login = async(req, res) => {
    const verifyOTP = otpVerify.create({crypto: require('crypto')});
  const { email, password, otp } = req.body;
  try {
    const userFound = await Reg.findOne({ email });
    if (!userFound) {
      return res.json({ status: "error", message: "Invalid Credentials" });
    }
    const passwordFound = await bcrypt.compare(password, userFound.password);
    const otpFound = verifyOTP.check(userFound.otp, otp);
    if (!passwordFound || !otpFound) {
      return res.json({ status: "error", message: "Invalid Credentials" });
    }
    res.json({
      status: "success",
      data: {
        userFound,
        token: genToken(userFound._id),
      },
    });
  } catch (error) {
    res.json({
      status: "error",
      message: error.message,
    });
  }
}
  


export const getUser = async(req, res) => {
    try{
        console.log(req.userAuth);
        const foundUser = await Reg.findById(req.userAuth);
        if(foundUser){
            res.json({
                status: "Success",
                data: {foundUser}
            });
        }else{
            res.json({
                status: "Success",
                message: "User does not exist"
            });
        }
    }catch(error){
        res.json(error.message)
    }
}

export const updateProfile = async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await Reg.findById(req.userAuth);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      user.username = username || user.username;
      if (password) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        user.password = hashedPassword;
      }
      const updatedUser = await user.save();
      res.json({
        status: "success",
        data: updatedUser,
      });
    } catch (error) {
      console.error(`Error updating profile: ${error.message}`);
      res.status(500).json({ message: "Internal server error" });
    }
  };