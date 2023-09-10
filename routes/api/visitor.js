/**
 * @file This is the Visitor Route and handles the types of requests for the Visitor model
 * @author Chase Bennett-Hill
 */
import express from "express";
import {
  createVisitor,
  getVisitors,
  getVisitor,
  updateVisitor,
  deleteVisitor,
} from "../../controllers/api/visitor.js";

import {
  validatePostVisitor,
  validateUpdateVisitor,
} from "../../middleware/validation.js";
const router = express.Router();
router.post("/", validatePostVisitor, createVisitor);
router.get("/", getVisitors);
router.get("/:id", getVisitor);
router.put("/:id", validateUpdateVisitor, updateVisitor);
router.delete("/:id", deleteVisitor);

export default router;
