import mongoose from "mongoose";
import Task from "../models/todomodel";
import Category from "../models/categorymodel";
import { AppError } from '../error/errorHandler';
import { TaskStatus } from "../types/enums";

class TodoService {
  // Category Methods
  async addCategory(name: string, userId: string) {
    const existing = await Category.findOne({ name, user: userId });
    if (existing) throw new AppError("Category already exists for this user", 400);
    return await Category.create({ name, user: userId });
  }

  async getCategories(userId: string) {
    return await Category.find({ user: userId });
  }

  async updateCategory(categoryId: string, name: string, userId: string) {
    const updated = await Category.findOneAndUpdate(
      { _id: categoryId, user: userId },
      { $set: { name } },
      { new: true }
    );
    if (!updated) throw new AppError("Category not found or unauthorized", 404);
    return updated;
  }

  async deleteCategory(categoryId: string, userId: string) {
    const deleted = await Category.findOneAndDelete({ _id: categoryId, user: userId });
    if (!deleted) throw new AppError("Category not found or unauthorized", 404);
    // Optional: Update tasks that used this category? For now, we leave them.
    return true;
  }

  // Task Methods
  async addTask(taskData: any, userId: string) {
    const { title, description, category, status, priorityLevel, progress, startDate, endDate } = taskData;
    
    // Verify category belongs to user
    const cat = await Category.findOne({ _id: category, user: userId });
    if (!cat) throw new AppError("Invalid category or unauthorized", 400);

    const foundTask = await Task.findOne({ title, user: userId });
    if (foundTask) throw new AppError("Task with this title already exists", 400);

    return await Task.create({
      title, description, category, status, priorityLevel, progress, startDate, endDate, user: userId
    });
  }

  async getAllTasks(userId: string) {
    return await Task.find({ user: userId }).populate('category', 'name');
  }

  async updateTask(taskId: string, updateData: any, userId: string) {
    if (updateData.category) {
      const cat = await Category.findOne({ _id: updateData.category, user: userId });
      if (!cat) throw new AppError("Invalid category or unauthorized", 400);
    }

    const updatedTask = await Task.findOneAndUpdate(
      { _id: taskId, user: userId },
      { $set: updateData },
      { new: true }
    ).populate('category', 'name');

    if (!updatedTask) throw new AppError("Task not found or unauthorized", 404);
    return updatedTask;
  }

  async completeTask(taskId: string, userId: string) {
    const task = await Task.findOne({ _id: taskId, user: userId });
    if (!task) throw new AppError("Task not found or unauthorized", 404);
    if (task.status === TaskStatus.COMPLETED) throw new AppError("Task is already completed", 400);
    
    task.status = TaskStatus.COMPLETED;
    task.progress = 100;
    await task.save();
    return task;
  }

  async deleteTask(taskId: string, userId: string) {
    const deleted = await Task.findOneAndDelete({ _id: taskId, user: userId });
    if (!deleted) throw new AppError("Task not found or unauthorized", 404);
    return true;
  }

  async getTaskStats(userId: string, year?: number) {
    const selectedYear = year || new Date().getFullYear();
    const startOfYear = new Date(selectedYear, 0, 1);
    const endOfYear = new Date(selectedYear, 11, 31, 23, 59, 59);

    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const [generalStats, monthlyData] = await Promise.all([
      Task.aggregate([
        { $match: { user: new mongoose.Types.ObjectId(userId) } },
        {
          $group: {
            _id: null,
            totalTasks: { $sum: 1 },
            completed: {
              $sum: { $cond: [{ $eq: ["$status", TaskStatus.COMPLETED] }, 1, 0] }
            },
            ongoing: {
              $sum: { $cond: [{ $eq: ["$status", TaskStatus.ONGOING] }, 1, 0] }
            },
            incomplete: {
              $sum: { $cond: [{ $eq: ["$status", TaskStatus.INCOMPLETE] }, 1, 0] }
            },
            completedThisMonth: {
              $sum: {
                $cond: [
                  {
                    $and: [
                      { $eq: ["$status", TaskStatus.COMPLETED] },
                      { $gte: ["$updatedAt", startOfMonth] }
                    ]
                  },
                  1,
                  0
                ]
              }
            }
          }
        }
      ]),
      Task.aggregate([
        {
          $match: {
            user: new mongoose.Types.ObjectId(userId),
            status: TaskStatus.COMPLETED,
            updatedAt: { $gte: startOfYear, $lte: endOfYear }
          }
        },
        {
          $group: {
            _id: { $month: "$updatedAt" },
            count: { $sum: 1 }
          }
        },
        { $sort: { "_id": 1 } }
      ])
    ]);

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const chartData = months.map((month, index) => {
      const foundIdx = monthlyData.findIndex(d => d._id === index + 1);
      return {
        month,
        completed: foundIdx !== -1 ? monthlyData[foundIdx].count : 0
      };
    });

    const stats = generalStats[0] || {
      totalTasks: 0,
      completed: 0,
      ongoing: 0,
      incomplete: 0,
      completedThisMonth: 0
    };

    return {
      summary: stats,
      chartData,
      year: selectedYear
    };
  }
}

export default new TodoService();
