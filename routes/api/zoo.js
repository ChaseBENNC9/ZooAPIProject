import express from "express";

import {
  createModel,
  getModels,
  getModel,
  updateModel,
  deleteModel,
} from "../../controllers/api/api.js";

const router = express.Router();
router.post("/", createModel("zoo")); 
router.get("/", getModels("zoo"));
router.get("/:id", getModel("zoo"));
router.put("/:id", updateModel("zoo"));
router.delete("/:id", deleteModel("zoo"));

export default router; 