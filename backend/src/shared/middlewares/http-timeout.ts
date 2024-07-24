import { TimeoutError } from "../errors";
import { ExpressMiddlewareCaught } from "../../utils/types";
import { HTTP_TIMEOUT_MS } from "../../utils/constants";

export const handleOrThrowTimeoutError =
  (controllerFunction: Function): ExpressMiddlewareCaught =>
  (req, res) =>
    Promise.race([
      controllerFunction(req, res),
      new Promise((_, reject) =>
        setTimeout(() => {
          reject(new TimeoutError());
        }, HTTP_TIMEOUT_MS),
      ),
    ]);
