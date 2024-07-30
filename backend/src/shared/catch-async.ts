import { NextFunction, Request, Response } from "express";

import { ExpressMiddlewareCaught } from "../utils/types";

export const catchAsync =
  (controllerFunction: ExpressMiddlewareCaught) => (req: Request, res: Response, next: NextFunction) => {
    controllerFunction(req, res).catch(next);
  };
