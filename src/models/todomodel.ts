import mongoose, { Document, Schema } from "mongoose";

export interface ITask extends Document {
  head: string;
  item: string;
  category: "Crucial" | "Personal" | "Work";
  status: "Completed" | "Incomplete";
  startDate?: Date;
  endDate?: Date;
  user: mongoose.Types.ObjectId;
}

const TaskSchema: Schema = new mongoose.Schema({
  head: {
    type: String,
    required: true
  },
  item: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: [true, "A Task Must Have A Category"],
    enum: ["Crucial", "Personal", "Work"]
  },
  status: {
    type: String,
    required: [true, "A Task Must Have A Status"],
    enum: ["Completed", "Incomplete"]
  },
  startDate: {
    type: Date,
    required: [false, "A Task Must Have A Date"]
  },
  endDate: {
    type: Date,
    required: [false, "A Task Must Have A Date"]
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Register"
  }
},
{
  timestamps: true
});

const Task = mongoose.model<ITask>("Task", TaskSchema);

export default Task;