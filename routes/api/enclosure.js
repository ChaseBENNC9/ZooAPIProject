import express from "express";

import {
  createEnclosure,
  getEnclosures,
  getEnclosure,
  updateEnclosure,
  deleteEnclosure,
} from "../../controllers/api/enclosure.js";

const router = express.Router();
router.post("/", createEnclosure);
router.get("/", getEnclosures);
router.get("/:id",getEnclosure);
router.put("/:id", updateEnclosure);
router.delete("/:id", deleteEnclosure);

export default router;
