import { NextFunction, Request, Response } from "express";
import { describe, expect, it, vi } from "vitest";

import { HTTP_TIMEOUT_MS } from "../../utils/constants";
import { ExpressMiddlewareResponseType } from "../../utils/types";
import { TimeoutError } from "../errors";
import { catchAsync } from "./catch-async";
import { handleOrThrowTimeoutError } from "./http-timeout";

describe("Http-wrappers", () => {
  const mockReq = {} as Request;
  const mockRes = {
    status: vi.fn().mockReturnThis(),
    send: vi.fn(),
  } as unknown as Response;
  const mockNext = vi.fn() as NextFunction;

  describe("handleOrThrowTimeoutError", () => {
    it("should resolve the controller function within the timeout", async () => {
      const controllerFunction = vi.fn(async (_req: Request, res: Response) => {
        await new Promise((resolve) => setTimeout(resolve, 50)); // Simulate some work
        res.status(200).send("Success");
      });

      await handleOrThrowTimeoutError(controllerFunction)(mockReq, mockRes);

      expect(controllerFunction).toHaveBeenCalledWith(mockReq, mockRes);
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.send).toHaveBeenCalledWith("Success");
    });

    it("should throw a TimeoutError if the controller function exceeds the timeout", async () => {
      const controllerFunction = vi.fn(async (_req: Request, _res: Response) => {
        await new Promise((resolve) => setTimeout(resolve, HTTP_TIMEOUT_MS + 50)); // Simulate work that exceeds timeout
      });

      await expect(handleOrThrowTimeoutError(controllerFunction)(mockReq, mockRes)).rejects.toThrow(TimeoutError);
    });

    it("should not throw a TimeoutError if the controller function resolves exactly at the timeout limit", async () => {
      const controllerFunction = vi.fn(async (req: Request, res: Response) => {
        await new Promise((resolve) => setTimeout(resolve, HTTP_TIMEOUT_MS)); // Simulate work that resolves exactly at the timeout limit
        res.status(200).send("Success");
      });

      await handleOrThrowTimeoutError(controllerFunction)(mockReq, mockRes);

      expect(controllerFunction).toHaveBeenCalledWith(mockReq, mockRes);
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.send).toHaveBeenCalledWith("Success");
    });
  });

  describe("catchAsync", () => {
    it("should call the controller function and handle a resolved promise", () => {
      const controllerFunction = vi.fn(async (req: Request, res: Response): Promise<ExpressMiddlewareResponseType> => {
        return res.status(200).send("Success");
      });

      catchAsync(controllerFunction)(mockReq, mockRes, mockNext);

      expect(controllerFunction).toHaveBeenCalledWith(mockReq, mockRes);
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.send).toHaveBeenCalledWith("Success");
      expect(mockNext).not.toHaveBeenCalled();
    });

    it("should call the next function with an error if the promise is rejected", async () => {
      const error = new Error("Test error");
      const controllerFunction = vi.fn(async () => {
        throw error;
      });

      const wrappedFunction = catchAsync(controllerFunction);

      await wrappedFunction(mockReq, mockRes, mockNext);

      expect(controllerFunction).toHaveBeenCalledWith(mockReq, mockRes);
      expect(mockNext).toHaveBeenCalledWith(error);
    });
  });
});
