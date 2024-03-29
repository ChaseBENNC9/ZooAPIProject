/**
 * @file This is the Enclosure Route and handles the types of requests for the Enclosure model
 * @author Chase Bennett-Hill
 */
import express from "express";

import {
  createEnclosure,
  getEnclosures,
  getEnclosure,
  updateEnclosure,
  deleteEnclosure,
} from "../../controllers/api/enclosure.js";
import {
  validatePostEnclosure,
  validateUpdateEnclosure,
} from "../../middleware/validation.js";

const router = express.Router();
router.post("/", validatePostEnclosure, createEnclosure);
router.get("/", getEnclosures);
router.get("/:id", getEnclosure);
router.put("/:id", validateUpdateEnclosure, updateEnclosure);
router.delete("/:id", deleteEnclosure);

export default router;
