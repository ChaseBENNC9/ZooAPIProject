/**
 * @file This is the Zoo Route and handles the types of requests for the zoo model
 * @author Chase Bennett-Hill
 */
import express from "express";

import {
  createZoo,
  getZoos,
  getZoo,
  updateZoo,
  deleteZoo,
} from "../../controllers/api/zoo.js";

import {
  validatePostZoo,
  validateUpdateZoo,
} from "../../middleware/validation.js";

const router = express.Router();
router.post("/", validatePostZoo, createZoo);
router.get("/", getZoos);
router.get("/:id", getZoo);
router.put("/:id", validateUpdateZoo, updateZoo);
router.delete("/:id", deleteZoo);

export default router;
