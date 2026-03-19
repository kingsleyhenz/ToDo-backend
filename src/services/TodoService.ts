import Task from "../models/todomodel";
import { AppError } from '../error/errorHandler';

class TodoService {
  async addTask(taskData: any, userId: string) {
    const { head, item, category, status, startDate, endDate } = taskData;
    const foundTask = await Task.findOne({ item });
    if (foundTask) throw new AppError("Task Already exists", 400);

    return await Task.create({
      head, item, category, status, startDate, endDate, user: userId
    });
  }

  async getAllTasks(userId: string) {
    return await Task.find({ user: userId });
  }

  async updateTask(taskId: string, updateData: any) {
    const updatedTask = await Task.findByIdAndUpdate(taskId, {
      $set: {
        head: updateData.head,
        item: updateData.item,
        status: updateData.status,
        endDate: updateData.endDate
      }
    }, { new: true });
    if (!updatedTask) throw new AppError("Task not found", 404);
    return updatedTask;
  }

  async completeTask(taskId: string) {
    const task = await Task.findById(taskId);
    if (!task) throw new AppError("Task not found", 404);
    if (task.status === "Completed") throw new AppError("Task is already completed", 400);
    task.status = "Completed";
    await task.save();
    return task;
  }

  async deleteTask(taskId: string) {
    const deleted = await Task.findByIdAndDelete(taskId);
    if (!deleted) throw new AppError("Task not found", 404);
    return true;
  }
}

export default new TodoService();
