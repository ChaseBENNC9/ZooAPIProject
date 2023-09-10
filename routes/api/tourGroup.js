/**
 * @file This is the Tour Group Route and handles the types of requests for the Tour Group model
 * @author Chase Bennett-Hill
 */
import express from "express";
import {
  createTourGroup,
  getTourGroups,
  getTourGroup,
  updateTourGroup,
  deleteTourGroup,
} from "../../controllers/api/tourGroup.js";

import {
  validatePostTourGroup,
  validateUpdateTourGroup,
} from "../../middleware/validation.js";
const router = express.Router();
router.post("/", validatePostTourGroup, createTourGroup);
router.get("/", getTourGroups);
router.get("/:id", getTourGroup);
router.put("/:id", validateUpdateTourGroup, updateTourGroup);
router.delete("/:id", deleteTourGroup);

export default router;
