import type { Request, Response, NextFunction } from "express";
import TodoService from "../services/TodoService";

export const addTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // @ts-ignore
    const task = await TodoService.addTask(req.body, req.userAuth);
    res.status(201).json({ status: "success", data: task });
  } catch (error) {
    next(error);
  }
};

export const allTasks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // @ts-ignore
    const tasks = await TodoService.getAllTasks(req.userAuth);
    res.status(200).json({ status: "success", data: tasks });
  } catch (error) {
    next(error);
  }
};

export const updateTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const task = await TodoService.updateTask(req.params.id as string, req.body);
    res.status(200).json({ status: "success", data: task });
  } catch (error) {
    next(error);
  }
};

export const completeTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await TodoService.completeTask(req.params.id as string);
    res.status(200).json({ status: "success", message: "Task completed successfully" });
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await TodoService.deleteTask(req.params.id as string);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
