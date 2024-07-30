import { NextFunction, Request, Response } from "express";

export type Brand<K, T> = K & { __brand: T };

export type ElementType<T extends ReadonlyArray<unknown>> =
  T extends ReadonlyArray<infer ElementType> ? ElementType : never;

export type ExpressMiddlewareResponseType = Response<any, Record<string, any>>;

export type ExpressMiddlewareCaught = (req: Request, res: Response) => Promise<ExpressMiddlewareResponseType>;

export type ExpressMiddlewareErrorController = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => ExpressMiddlewareResponseType;
