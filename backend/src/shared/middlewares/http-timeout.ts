import { TimeoutError } from "../errors";
import { ExpressMiddlewareCaught } from "../../utils/types";

export const handleOrThrowTimeoutError =
  (controllerFunction: Function): ExpressMiddlewareCaught =>
  (req, res) =>
    Promise.race([
      controllerFunction(req, res),
      new Promise((_, reject) =>
        setTimeout(() => {
          reject(new TimeoutError());
        }, 5000),
      ),
    ]);
