import express from "express";

const router = express.Router();

router.get("/", (req, res, next) => {
  return res.json({ status: "healthy as fuck" });
});

export default router;
