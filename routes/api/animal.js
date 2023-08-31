import express from "express";

import {
  createModel,
  getModels,
  getModel,
  updateModel,
  deleteModel,
} from "../../controllers/api/api.js";

const router = express.Router();
router.post("/", createModel("animal")); 
router.get("/", getModels("animal"));
router.get("/:id", getModel("animal"));
router.put("/:id", updateModel("animal"));
router.delete("/:id", deleteModel("animal"));

export default router; 