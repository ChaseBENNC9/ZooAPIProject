/**
 * @file This is the Animal Route and handles the types of requests for the Animal model
 * @author Chase Bennett-Hill
 */
import express from "express";

import {
  createAnimal,
  getAnimals,
  getAnimal,
  updateAnimal,
  deleteAnimal,
} from "../../controllers/api/animal.js";

const router = express.Router();
router.post("/", createAnimal);
router.get("/", getAnimals);
router.get("/:id", getAnimal);
router.put("/:id", updateAnimal);
router.delete("/:id", deleteAnimal);

export default router;
