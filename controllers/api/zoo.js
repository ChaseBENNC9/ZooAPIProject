/**
 * @file Manages all of the Different Zoo's
 * @author Chase Bennett-Hill
 *
 */
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

/**
 * @description This function creates a new Zoo
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @returns {object} - The response object
 */
const createZoo = async (req, res) => {
  try {
    await prisma.zoo.create({
      data: { ...req.body },
    });

    const newZoos = await prisma.zoo.findMany();

    return res.status(201).json({
      msg: "Zoo successfully created",
      data: newZoos,
    });
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    });
  }
};

/**
 * @description This function gets all of the Zoo's in the API
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @returns {object} - The response object
 */
const getZoos = async (req, res) => {
  try {
    const sortBy = req.query.sortBy || "id";
    const sortOrder = req.query.sortOrder === "desc" ? "desc" : "asc";

    const page = req.query.page || 1;
    const count = req.query.count || 25;

    const query = {
      take: Number(count),
      skip: Number((page - 1) * count),
      orderBy: {
        [sortBy]: sortOrder,
      },
    };
    if (
      req.query.id ||
      req.query.name ||
      req.query.city ||
      req.query.country ||
      req.query.established
    ) {
      query.where = {
        id: {
          in: parseInt(req.query.id) || undefined,
        },
        name: {
          in: req.query.name || undefined,
        },
        city: {
          in: req.query.city || undefined,
        },
        country: {
          in: req.query.country || undefined,
        },
        established: {
          in: req.query.established || undefined,
        },
      };
    }
    const Zoos = await prisma.zoo.findMany(query);

    if (Zoos.length === 0) {
      return res.status(404).json({ msg: "No Zoos found" });
    }

    return res.json({ data: Zoos });
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    });
  }
};
/**
 * @description This function gets a Zoo with the specific ID
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @param {number} id - the ID number of the Zoo
 * @returns {object} - The response object
 */
const getZoo = async (req, res) => {
  try {
    const zoo = await prisma.zoo.findUnique({
      where: { id: Number(req.params.id) },
      include: {
        enclosures: true,
      },
    });

    if (!zoo) {
      return res
        .status(404)
        .json({ msg: `No Zoo with the id: ${req.params.id} found` });
    }

    return res.json({
      data: zoo,
    });
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    });
  }
};
/**
 * @description This function Updates information for a Zoo with the specific ID
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @param {number} id - the ID number of the Zoo
 * @returns {object} - The response object
 */
const updateZoo = async (req, res) => {
  try {
    let zoo = await prisma.zoo.findUnique({
      where: { id: Number(req.params.id) },
    });

    if (!zoo) {
      return res
        .status(404)
        .json({ msg: `No Zoo with the id: ${req.params.id} found` });
    }

    zoo = await prisma.zoo.update({
      where: { id: Number(req.params.id) },
      data: { ...req.body },
    });

    return res.json({
      msg: `Zoo with the id: ${req.params.id} successfully updated`,
      data: zoo,
    });
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    });
  }
};
/**
 * @description This function deletes a Zoo with the specific ID
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @param {number} id - the ID number of the Zoo
 * @returns {object} - The response object
 */
const deleteZoo = async (req, res) => {
  try {
    const zoo = await prisma.zoo.findUnique({
      where: { id: Number(req.params.id) },
    });

    if (!zoo) {
      return res
        .status(404)
        .json({ msg: `No Zoo with the id: ${req.params.id} found` });
    }

    await prisma.zoo.delete({
      where: { id: Number(req.params.id) },
    });

    return res.json({
      msg: `Zoo with the id: ${req.params.id} successfully deleted`,
    });
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    });
  }
};

export { createZoo, getZoos, getZoo, updateZoo, deleteZoo };
