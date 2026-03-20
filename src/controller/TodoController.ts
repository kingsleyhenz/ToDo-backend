import type { Request, Response, NextFunction } from "express";
import TodoService from "../services/TodoService";

// Task Controllers
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
    // @ts-ignore
    const task = await TodoService.updateTask(req.params.id as string, req.body, req.userAuth);
    res.status(200).json({ status: "success", data: task });
  } catch (error) {
    next(error);
  }
};

export const completeTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // @ts-ignore
    await TodoService.completeTask(req.params.id as string, req.userAuth);
    res.status(200).json({ status: "success", message: "Task completed successfully" });
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // @ts-ignore
    await TodoService.deleteTask(req.params.id as string, req.userAuth);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

export const getStats = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const year = req.query.year ? parseInt(req.query.year as string) : undefined;
    // @ts-ignore
    const stats = await TodoService.getTaskStats(req.userAuth, year);
    res.status(200).json({ status: "success", data: stats });
  } catch (error) {
    next(error);
  }
};

export const getProgression = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const from = req.query.from as string | undefined;
    const to = req.query.to as string | undefined;
    
    // @ts-ignore
    const data = await TodoService.getProgression(req.userAuth, from, to);
    res.status(200).json({ status: "success", data });
  } catch (error) {
    next(error);
  }
};

// Category Controllers
export const addCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // @ts-ignore
    const category = await TodoService.addCategory(req.body.name, req.userAuth);
    res.status(201).json({ status: "success", data: category });
  } catch (error) {
    next(error);
  }
};

export const getCategories = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // @ts-ignore
    const categories = await TodoService.getCategories(req.userAuth);
    res.status(200).json({ status: "success", data: categories });
  } catch (error) {
    next(error);
  }
};

export const updateCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // @ts-ignore
    const category = await TodoService.updateCategory(req.params.id, req.body.name, req.userAuth);
    res.status(200).json({ status: "success", data: category });
  } catch (error) {
    next(error);
  }
};

export const deleteCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // @ts-ignore
    await TodoService.deleteCategory(req.params.id, req.userAuth);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
