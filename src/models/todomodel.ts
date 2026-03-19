import mongoose, { Document, Schema } from "mongoose";
import { TaskStatus, PriorityLevel } from "../types/enums";

export interface ITask extends Document {
  title: string;
  description: string;
  category: mongoose.Types.ObjectId;
  status: TaskStatus;
  priorityLevel: PriorityLevel;
  progress: number;
  startDate?: Date;
  endDate?: Date;
  user: mongoose.Types.ObjectId;
}

const TaskSchema: Schema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Task title is required"]
  },
  description: {
    type: String,
    required: [true, "Task description is required"]
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: [true, "A Task Must Have A Category"]
  },
  status: {
    type: String,
    required: [true, "A Task Must Have A Status"],
    enum: Object.values(TaskStatus),
    default: TaskStatus.INCOMPLETE
  },
  priorityLevel: {
    type: String,
    required: [true, "A Task Must Have A Priority"],
    enum: Object.values(PriorityLevel),
    default: PriorityLevel.MEDIUM
  },
  progress: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
    default: 0
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
    ref: "User",
    required: true
  }
},
{
  timestamps: true
});

const Task = mongoose.model<ITask>("Task", TaskSchema);

export default Task;