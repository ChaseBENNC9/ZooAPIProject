import express from "express";

import {
  getModelName,
  createModel,
  getModels,
  getModel,
  updateModel,
  deleteModel,
} from "../controllers/api.js";

getModelName("server");
const institutionRoutes = express.Router();
institutionRoutes.post("/", createModel);
institutionRoutes.get("/", getModels);
institutionRoutes.get("/:id", getModel);
institutionRoutes.put("/:id", updateModel);
institutionRoutes.delete("/:id", deleteModel);

const departmentRoutes = express.Router();
departmentRoutes.post("/", createModel);
departmentRoutes.get("/", getModels);
departmentRoutes.get("/:id", getModel);
departmentRoutes.put("/:id", updateModel);
departmentRoutes.delete("/:id", deleteModel);
export {
    institutionRoutes,
    departmentRoutes
};