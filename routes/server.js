import express from "express";

import {
  createServer,
  getServers,
  getServer,
  updateServer,
  deleteServer,
} from "../controllers/server.js";

const router = express.Router();

router.post("/", createServer);
router.get("/", getServers);
router.get("/:id", getServer);
router.put("/:id", updateServer);
router.delete("/:id", deleteServer);

export default router;