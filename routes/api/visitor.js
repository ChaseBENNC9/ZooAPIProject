import express from "express";

import {
  createVisitor,
  getVisitors,
  getVisitor,
  updateVisitor,
  deleteVisitor,
} from "../../controllers/api/visitor.js";

const router = express.Router();
router.post("/", createVisitor);
router.get("/", getVisitors);
router.get("/:id", getVisitor);
router.put("/:id", updateVisitor);
router.delete("/:id", deleteVisitor);

export default router;
