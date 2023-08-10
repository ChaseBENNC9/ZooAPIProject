import express from "express";

import {
  createModel,
  getModel,
  updateModel,
  deleteModel,
} from "../controllers/api.js";
import { getInstitutions } from "../controllers/institution.js";

const router = express.Router();
router.post("/", createModel("institution"));
router.get("/", getInstitutions);
router.get("/:id", getModel("institution"));
router.put("/:id", updateModel("institution"));
router.delete("/:id", deleteModel("institution"));

export default router;