import express from "express";

import {
  createModel,
  getModels,
  getModel,
  updateModel,
  deleteModel,
} from "../../controllers/api/api.js";

const router = express.Router();
router.post("/", createModel("enclosure")); 
router.get("/", getModels("enclosure"));
router.get("/:id", getModel("enclosure"));
router.put("/:id", updateModel("enclosure"));
router.delete("/:id", deleteModel("enclosure"));

export default router; 