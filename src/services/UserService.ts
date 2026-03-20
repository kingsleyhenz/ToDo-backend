import User from '../models/usermodel';
import Task from '../models/todomodel';
import genToken from '../util/tokenGen';
import nodemailer from "nodemailer";
import bcrypt from 'bcrypt';
import { AppError } from '../error/errorHandler';

class UserService {
  async register(userData: any) {
    const { name, username, email } = userData;
    const foundUser = await User.findOne({ email });
    if (foundUser) throw new AppError("User Already Exists", 400);

    const otp = "12345";
    const user = await User.create({ 
      name, 
      username, 
      email, 
      password: "PENDING_PASSWORD", 
      otp 
    });

    await this.sendConfirmationEmail(name, email, otp);
    return user;
  }

  async createPassword(payload: any) {
    const { email, otp, newPassword } = payload;
    const user = await User.findOne({ email });
    
    if (!user) throw new AppError("User not found", 404);
    if (user.otp !== otp) throw new AppError("Invalid OTP", 400);

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;
    user.otp = "";
    await user.save();

    return { status: "success", message: "Password created successfully" };
  }

  async login(credentials: any) {
    const { email, password } = credentials;
    const user = await User.findOne({ email });
    if (!user) throw new AppError("Invalid Credentials", 401);

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new AppError("Invalid Credentials", 401);

    return { 
      user, 
      token: genToken(user._id) 
    };
  }

  async getUserById(userId: string) {
    // using lean so we can modify the object easily
    const foundUser = await User.findById(userId).lean();
    if (!foundUser) throw new AppError("User does not exist", 404);
    
    // Fetch all user's tasks
    const tasks = await Task.find({ user: userId }).populate('category', 'name');
    
    return { ...foundUser, tasks };
  }

  async updateProfile(userId: string, updateData: any) {
    const { name, username } = updateData;
    const user = await User.findById(userId);
    if (!user) throw new AppError("User not found", 404);

    if (name) user.name = name;
    if (username) user.username = username;
    
    await user.save();
    return user;
  }

  async updatePassword(userId: string, payload: any) {
    const { currentPassword, newPassword } = payload;
    const user = await User.findById(userId);
    if (!user) throw new AppError("User not found", 404);

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) throw new AppError("Invalid current password", 401);

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    
    await user.save();
    return { message: "Password updated successfully" };
  }

  async sendConfirmationEmail(name: string, email: string, otp: string) {
    try {
      console.log(`[Email to ${email}]: Hi ${name}, your OTP for password creation is ${otp}`);
    } catch (e: any) { console.log("Email error:", e.message); }
  }
}

export default new UserService();
