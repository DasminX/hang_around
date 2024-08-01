import { Request, Response } from "express";

import { HTTP_TIMEOUT_MS } from "../../utils/constants";
import { ExpressMiddlewareCaught } from "../../utils/types";
import { TimeoutError } from "../errors";

export const handleOrThrowTimeoutError =
  (controllerFunction: (req: Request, res: Response) => Promise<any>): ExpressMiddlewareCaught =>
  (req, res) =>
    Promise.race([
      controllerFunction(req, res),
      new Promise((_, reject) =>
        setTimeout(() => {
          reject(new TimeoutError());
        }, HTTP_TIMEOUT_MS),
      ),
    ]);
