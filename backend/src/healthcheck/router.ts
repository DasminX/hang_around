import express from "express";

const router = express.Router();

router.get("/", (_req, res, _next) => {
  return res.json({ status: "healthy as fuck" });
});

export default router;
