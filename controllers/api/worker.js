/**
 * @file Manages all of the Different Worker's
 * @author Chase Bennett-Hill
 *
 */
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

/**
 * @description This function creates a new Worker
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @returns {object} - The response object
 */
const createWorker = async (req, res) => {
  try {
    await prisma.worker.create({
      data: { ...req.body },
    });

    const newWorkers = await prisma.worker.findMany();

    return res.status(201).json({
      msg: "Worker successfully created",
      data: newWorkers,
    });
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    });
  }
};

/**
 * @description This function gets all of the Worker's in the API
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @returns {object} - The response object
 */
const getWorkers = async (req, res) => {
  try {
    const Workers = await prisma.worker.findMany();

    if (Workers.length === 0) {
      return res.status(404).json({ msg: "No Workers found" });
    }

    return res.json({ data: Workers });
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    });
  }
};
/**
 * @description This function gets a Worker with the specific ID
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @param {number} id - the ID number of the Worker
 * @returns {object} - The response object
 */
const getWorker = async (req, res) => {
  try {
    const worker = await prisma.worker.findUnique({
      where: { id: Number(req.params.id) },
    });

    if (!worker) {
      return res
        .status(404)
        .json({ msg: `No Worker with the id: ${req.params.id} found` });
    }

    return res.json({
      data: worker,
    });
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    });
  }
};
/**
 * @description This function Updates information for an Worker with the specific ID
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @param {number} id - the ID number of the Worker
 * @returns {object} - The response object
 */
const updateWorker = async (req, res) => {
  try {
    let worker = await prisma.worker.findUnique({
      where: { id: Number(req.params.id) },
    });

    if (!worker) {
      return res
        .status(404)
        .json({ msg: `No Worker with the id: ${req.params.id} found` });
    }

    worker = await prisma.worker.update({
      where: { id: Number(req.params.id) },
      data: { ...req.body },
    });

    return res.json({
      msg: `Worker with the id: ${req.params.id} successfully updated`,
      data: worker,
    });
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    });
  }
};
/**
 * @description This function deletes a Worker with the specific ID
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @param {number} id - the ID number of the Worker
 * @returns {object} - The response object
 */
const deleteWorker = async (req, res) => {
  try {
    const worker = await prisma.worker.findUnique({
      where: { id: Number(req.params.id) },
    });

    if (!worker) {
      return res
        .status(404)
        .json({ msg: `No Worker with the id: ${req.params.id} found` });
    }

    await prisma.worker.delete({
      where: { id: Number(req.params.id) },
    });

    return res.json({
      msg: `Worker with the id: ${req.params.id} successfully deleted`,
    });
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    });
  }
};

export { createWorker, getWorkers, getWorker, updateWorker, deleteWorker };
