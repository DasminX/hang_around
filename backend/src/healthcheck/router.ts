import express from "express";
import { StatusCodes } from "http-status-codes";

const router = express.Router();

router.get("/", (_req, res, _next) => res.status(StatusCodes.OK).json({ alive: true }));

export default router;
