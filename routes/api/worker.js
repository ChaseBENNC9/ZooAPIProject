/**
 * @file This is the Worker Route and handles the types of requests for the Worker model
 * @author Chase Bennett-Hill
 */
import express from "express";
import {
  createWorker,
  getWorkers,
  getWorker,
  updateWorker,
  deleteWorker,
} from "../../controllers/api/worker.js";
import {
  validatePostWorker,
  validateUpdateWorker,
} from "../../middleware/validation.js";

const router = express.Router();
router.post("/", validatePostWorker, createWorker);
router.get("/", getWorkers);
router.get("/:id", getWorker);
router.put("/:id", validateUpdateWorker, updateWorker);
router.delete("/:id", deleteWorker);

export default router;
