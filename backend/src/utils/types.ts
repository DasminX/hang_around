import { NextFunction, Request, Response } from "express";

export type Brand<K, T> = K & { __brand: T };

type ExpressMiddlewareResponseType = Response<any, Record<string, any>>;

export type ExpressMiddlewareCaught = (req: Request, res: Response) => Promise<ExpressMiddlewareResponseType>;

export type ExpressMiddlewareErrorController = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => ExpressMiddlewareResponseType;