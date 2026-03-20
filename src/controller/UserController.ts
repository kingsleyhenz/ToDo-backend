import type { Request, Response, NextFunction } from "express";
import UserService from "../services/UserService";

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await UserService.register(req.body);
    res.status(201).json({ status: "success", data: user });
  } catch (error) {
    next(error);
  }
};

export const createPassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await UserService.createPassword(req.body);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await UserService.login(req.body);
    res.status(200).json({ status: "success", data: result });
  } catch (error) {
    next(error);
  }
};

export const getUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // @ts-ignore
    const user = await UserService.getUserById(req.userAuth);
    res.status(200).json({ status: "success", data: user });
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // @ts-ignore
    const user = await UserService.updateProfile(req.userAuth, req.body);
    res.status(200).json({ status: "success", data: user });
  } catch (error) {
    next(error);
  }
};

export const updatePassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // @ts-ignore
    const result = await UserService.updatePassword(req.userAuth, req.body);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
