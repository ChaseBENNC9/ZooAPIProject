import express from "express";

import {
  createEnclosure,
  getEnclosures,
  getEnclosure,
  updateEnclosure,
  deleteEnclosure,
} from "../../controllers/api/enclosure.js";
import { validatePostEnclosure } from "../../middleware/validation.js";

const router = express.Router();
router.post("/",validatePostEnclosure ,createEnclosure);
router.get("/", getEnclosures);
router.get("/:id", getEnclosure);
router.put("/:id", validatePostEnclosure,updateEnclosure);
router.delete("/:id", deleteEnclosure);

export default router;
