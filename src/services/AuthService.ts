import Reg from '../models/regmodel';
import genToken from '../util/tokenGen';
import nodemailer from "nodemailer";
import otpGenerator from "otp-generator";
import { AppError } from '../error/errorHandler';

class AuthService {
  async register(userData: any) {
    const { name, username, email } = userData;
    const foundUser = await Reg.findOne({ email });
    if (foundUser) throw new AppError("User Already Exists", 400);

    const otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });
    const user = await Reg.create({ name, username, email, password: otp });

    await this.sendConfirmationEmail(name, email, otp);
    return user;
  }

  async login(credentials: any) {
    const { email, password } = credentials;
    const user = await Reg.findOne({ email });
    if (!user || user.password !== password) throw new AppError("Invalid Credentials", 401);

    return { user, token: genToken(user._id) };
  }

  async getUserById(userId: string) {
    const foundUser = await Reg.findById(userId);
    if (!foundUser) throw new AppError("User does not exist", 404);
    return foundUser;
  }

  async updateProfile(userId: string, updateData: any) {
    const { name, username, oldPassword, newPassword } = updateData;
    const user = await Reg.findById(userId);
    if (!user) throw new AppError("User not found", 404);
    if (user.password !== oldPassword) throw new AppError("Invalid old password", 401);

    user.name = name;
    user.username = username;
    user.password = newPassword;
    await user.save();
    return user;
  }

  async sendConfirmationEmail(name: string, email: string, otp: string) {
    try {
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com", port: 465, secure: true,
        auth: { user: "ayehenz29@gmail.com", pass: "xfkpqulivwwhwisc" }
      });
      await transporter.sendMail({
        from: "ayehenz29@gmail.com", to: email, subject: "Welcome!",
        text: `Hi ${name}, your password is ${otp}`
      });
    } catch (e: any) { console.log(e.message); }
  }
}

export default new AuthService();
