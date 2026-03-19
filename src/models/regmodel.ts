import mongoose, { Document, Schema } from "mongoose";

export interface IReg extends Document {
  name: string;
  username: string;
  email: string;
  password: string;
  otp?: string;
  createdAt: Date;
  updatedAt: Date;
}

const RegSchema: Schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
  }
},
{
  timestamps: true,
  toJSON: { virtuals: true }
});

const Reg = mongoose.model<IReg>("Register", RegSchema);

export default Reg;