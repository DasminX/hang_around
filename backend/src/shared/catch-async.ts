import { NextFunction, Request, Response } from "express";

export const catchAsync = (controllerFunction: Function) => (req: Request, res: Response, next: NextFunction) => {
  controllerFunction(req, res).catch(next);
};
