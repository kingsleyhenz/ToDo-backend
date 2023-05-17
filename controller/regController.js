// import bcrypt from 'bcrypt'
import Reg from '../models/regmodel.js';
import genToken from '../util/tokenGen.js';
import nodemailer from "nodemailer";
import otpGenerator from "otp-generator";



export const Register = async(req, res) => {
  const{name, username, email} = req.body;

  try{
      const foundUser = await Reg.findOne({email});
      if(foundUser){
          return res.json({status: "error", data: "User Already Exists"})
      }
      const otp = otpGenerator.generate(6, { upperCase: false, specialChars: false });
      
      const User = await Reg.create({
          name,
          username,
          email,
          password: otp,
      });
      await sendConfirmationEmail(name, email, password);
      res.json({
          status: "success",
          data: User
      })
  }catch(error){
      res.json(error.message) 
  }
}


export const sendConfirmationEmail = async (name, email, password) => {
    try {
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: "ayehenz29@gmail.com",
          pass: "xfkpqulivwwhwisc",
        },
      });
  
      const mailOptions = {
        from: "ayehenz29@gmail.com",
        to: email,
        subject: "Welcome to My App!",
        text: `Hi ${name},\n\nThank you for registering on My App. We're excited to have you onboard!\n\n Your default password is ${password} you can always change your password after logging in \n\nBest regards,\nMy App Team`,
      };
  
      await transporter.sendMail(mailOptions);
    } catch (error) {
      console.log(error.message);
    }
  };


  export const Login = async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await Reg.findOne({ email });
      if (!user) {
        return res.json({ status: "error", message: "Invalid Credentials" });
      }
      if (user.password !== password) {
        return res.json({ status: "error", message: "Invalid Credentials" });
      }
      res.json({
        status: "success",
        data: {
          user,
          token: genToken(user._id),
        },
      });
    } catch (error) {
      res.json({
        status: "error",
        message: error.message,
      });
    }
  };
  

  


export const getUser = async(req, res) => {
  try{
      const foundUser = await Reg.findById(req.userAuth);
      if(foundUser){
          const { name, username, email } = foundUser;
          res.json({
              status: "Success",
              data: {
                  name,
                  username,
                  email
              }
          });
      } else {
          res.json({
              status: "Success",
              message: "User does not exist"
          });
      }
  } catch(error){
      res.json(error.message)
  }
}

export const updateUserProfile = async (req, res) => {
  const { name, username, oldPassword, newPassword } = req.body;
  try {
    const user = await Reg.findById(req.userAuth);
    if (!user) {
      return res.json({ status: "error", message: "User not found" });
    }
    if (user.password !== oldPassword) {
      return res.json({ status: "error", message: "Invalid old password" });
    }
    user.name = name;
    user.username = username;
    user.password = newPassword;
    await user.save();
    res.json({
      status: "success",
      message: "Profile updated successfully",
      data: {
        user,
      },
    });
  } catch (error) {
    res.json({
      status: "error",
      message: error.message,
    });
  }
};

