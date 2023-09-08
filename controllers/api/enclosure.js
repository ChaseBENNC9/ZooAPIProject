/**
 * @file Manages all of the Different Enclosure's
 * @author Chase Bennett-Hill
 *
 */
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

/**
 * @description This function creates a new Enclosure
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @returns {object} - The response object
 */
const createEnclosure = async (req, res) => {
  try {
    await prisma.enclosure.create({
      data: { ...req.body },
    });

    const newEnclosures = await prisma.enclosure.findMany();

    return res.status(201).json({
      msg: "Enclosure successfully created",
      data: newEnclosures,
    });
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    });
  }
};

/**
 * @description This function gets all of the Enclosure's in the API
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @returns {object} - The response object
 */
const getEnclosures = async (req, res) => {
  try {
    const sortBy = req.query.sortBy || "name";
    const sortOrder = req.query.sortOrder === "desc" ? "desc" : "asc";

    const query = {
      orderBy: {
        [sortBy]: sortOrder,
      },
    };
    if (req.query.name || req.query.type || req.query.temporary || req.query.visitorCapacity) {
      query.where = {
        name: {
          in: req.query.name || undefined,
        },
        type: {
          in: req.query.type || undefined,
        },
        visitorCapacity: {
          in: req.query.visitorCapacity || undefined,
        },
      };
    }   
    const Enclosures = await prisma.enclosure.findMany(query);

    if (Enclosures.length === 0) {
      return res.status(404).json({ msg: "No Enclosures found" });
    }

    return res.json({ data: Enclosures });
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    });
  }
};
/**
 * @description This function gets a Enclosure with the specific ID
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @param {number} id - the ID number of the Enclosure
 * @returns {object} - The response object
 */
const getEnclosure = async (req, res) => {
  try {
    const enclosure = await prisma.enclosure.findUnique({
      where: { id: Number(req.params.id) },
      include: {
        animals: true,
      },
    });

    if (!enclosure) {
      return res
        .status(404)
        .json({ msg: `No Enclosure with the id: ${req.params.id} found` });
    }

    return res.json({
      data: enclosure,
    });
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    });
  }
};
/**
 * @description This function Updates information for an Enclosure with the specific ID
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @param {number} id - the ID number of the Enclosure
 * @returns {object} - The response object
 */
const updateEnclosure = async (req, res) => {
  try {
    let enclosure = await prisma.enclosure.findUnique({
      where: { id: Number(req.params.id) },
    });

    if (!enclosure) {
      return res
        .status(404)
        .json({ msg: `No Enclosure with the id: ${req.params.id} found` });
    }

    enclosure = await prisma.enclosure.update({
      where: { id: Number(req.params.id) },
      data: { ...req.body },
    });

    return res.json({
      msg: `Enclosure with the id: ${req.params.id} successfully updated`,
      data: enclosure,
    });
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    });
  }
};
/**
 * @description This function deletes a Enclosure with the specific ID
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @param {number} id - the ID number of the Enclosure
 * @returns {object} - The response object
 */
const deleteEnclosure = async (req, res) => {
  try {
    const enclosure = await prisma.enclosure.findUnique({
      where: { id: Number(req.params.id) },
    });

    if (!enclosure) {
      return res
        .status(404)
        .json({ msg: `No Enclosure with the id: ${req.params.id} found` });
    }

    await prisma.enclosure.delete({
      where: { id: Number(req.params.id) },
    });

    return res.json({
      msg: `Enclosure with the id: ${req.params.id} successfully deleted`,
    });
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    });
  }
};

export {
  createEnclosure,
  getEnclosures,
  getEnclosure,
  updateEnclosure,
  deleteEnclosure,
};
