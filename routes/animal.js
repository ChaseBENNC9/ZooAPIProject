import express from "express";

import {
  createAnimal,
  getAnimals,
  getAnimal,
  updateAnimal,
  deleteAnimal,
} from "../controllers/animal.js";

const router = express.Router();

router.post("/", createAnimal);
router.get("/", getAnimals);
router.get("/:id", getAnimal);
router.put("/:id", updateAnimal);
router.delete("/:id", deleteAnimal);

export default router;