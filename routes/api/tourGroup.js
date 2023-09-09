import express from "express";

import {
  createTourGroup,
  getTourGroups,
  getTourGroup,
  updateTourGroup,
  deleteTourGroup,
} from "../../controllers/api/tourGroup.js";

const router = express.Router();
router.post("/", createTourGroup);
router.get("/", getTourGroups);
router.get("/:id", getTourGroup);
router.put("/:id", updateTourGroup);
router.delete("/:id", deleteTourGroup);

export default router;
