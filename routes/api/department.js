import express from "express";

import {
  createModel,
  getModels,
  getModel,
  updateModel,
  deleteModel,
} from "../../controllers/api/api.js";

const router = express.Router();
router.post("/", createModel("department")); 
router.get("/", getModels("department"));
router.get("/:id", getModel("department"));
router.put("/:id", updateModel("department"));
router.delete("/:id", deleteModel("department"));

export default router; 