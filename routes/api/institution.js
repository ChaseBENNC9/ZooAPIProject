import express from "express";

import {
  createModel,
  getModel,
  updateModel,
  deleteModel,
} from "../../controllers/api/api.js";
import { getInstitutions } from "../../controllers/api/institution.js";
import { validatePostInstitution } from "../../middleware/validation.js";
const router = express.Router();
router.post("/", validatePostInstitution,createModel("institution"));
router.get("/", getInstitutions);
router.get("/:id", getModel("institution"));
router.put("/:id", updateModel("institution"));
router.delete("/:id", deleteModel("institution"));

export default router;