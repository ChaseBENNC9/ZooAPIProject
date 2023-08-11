import express from "express";

import {
  createModel,
  getModels,
  getModel,
  updateModel,
  deleteModel,
} from "../../controllers/api/api.js";

const router = express.Router();
router.post("/", createModel("course")); 
router.get("/", getModels("course"));
router.get("/:id", getModel("course"));
router.put("/:id", updateModel("course"));
router.delete("/:id", deleteModel("course"));

export default router; 