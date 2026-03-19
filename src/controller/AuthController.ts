import type { Request, Response, NextFunction } from "express";
import AuthService from "../services/AuthService";

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await AuthService.register(req.body);
    res.status(201).json({ status: "success", data: user });
  } catch (error) {
    next(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await AuthService.login(req.body);
    res.status(200).json({ status: "success", data: result });
  } catch (error) {
    next(error);
  }
};

export const getUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // @ts-ignore
    const user = await AuthService.getUserById(req.userAuth);
    res.status(200).json({ status: "success", data: user });
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // @ts-ignore
    const user = await AuthService.updateProfile(req.userAuth, req.body);
    res.status(200).json({ status: "success", data: user });
  } catch (error) {
    next(error);
  }
};
