import express from "express";

import {
  createModel,
  getModels,
  getModel,
  updateModel,
  deleteModel,
} from "../../controllers/api/api.js";

const router = express.Router();
router.post("/", createModel("user")); 
router.get("/", getModels("user"));
router.get("/:id", getModel("user"));
router.put("/:id", updateModel("user"));
router.delete("/:id", deleteModel("user"));

export default router; 