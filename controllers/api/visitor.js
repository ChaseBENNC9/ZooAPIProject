/**
 * @file Manages all of the Different Visitor's
 * @author Chase Bennett-Hill
 *
 */
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

/**
 * @description This function creates a new Visitor
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @returns {object} - The response object
 */
const createVisitor = async (req, res) => {
  try {
    await prisma.visitor.create({
      data: { ...req.body },
    });

    const newVisitors = await prisma.visitor.findMany();

    return res.status(201).json({
      msg: "Visitor successfully created",
      data: newVisitors,
    });
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    });
  }
};

/**
 * @description This function gets all of the Visitor's in the API
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @returns {object} - The response object
 */
const getVisitors = async (req, res) => {
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
    if (req.query.id || req.query.zooId || req.query.firatName || req.query.lastName || req.query.ticketType  || req.query.ticketCost || req.query.visitDate) {
      query.where = {
        id: {
          in: parseInt(req.query.id) || undefined,
        },
        zooId: {
          in: req.query.zooId || undefined,
        },
        firstName: {
          in: req.query.firstName || undefined,
        },
        lastName: {
          in: req.query.lastName || undefined,
        },
        ticketType: {
          in: req.query.ticketType || undefined,
        },
        ticketCost: {
          in: req.query.ticketCost || undefined,
        },
        visitDate: {
          in: req.query.visitDate || undefined,
        },
      };
    }
    const Visitors = await prisma.visitor.findMany(query);

    if (Visitors.length === 0) {
      return res.status(404).json({ msg: "No Visitors found" });
    }

    return res.json({ data: Visitors });
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    });
  }
};
/**
 * @description This function gets a Visitor with the specific ID
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @param {number} id - the ID number of the Visitor
 * @returns {object} - The response object
 */
const getVisitor = async (req, res) => {
  try {
    const visitor = await prisma.visitor.findUnique({
      where: { id: Number(req.params.id) },
    });

    if (!visitor) {
      return res
        .status(404)
        .json({ msg: `No Visitor with the id: ${req.params.id} found` });
    }

    return res.json({
      data: visitor,
    });
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    });
  }
};
/**
 * @description This function Updates information for an Visitor with the specific ID
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @param {number} id - the ID number of the Visitor
 * @returns {object} - The response object
 */
const updateVisitor = async (req, res) => {
  try {
    let visitor = await prisma.visitor.findUnique({
      where: { id: Number(req.params.id) },
    });

    if (!visitor) {
      return res
        .status(404)
        .json({ msg: `No Visitor with the id: ${req.params.id} found` });
    }

    visitor = await prisma.visitor.update({
      where: { id: Number(req.params.id) },
      data: { ...req.body },
    });

    return res.json({
      msg: `Visitor with the id: ${req.params.id} successfully updated`,
      data: visitor,
    });
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    });
  }
};
/**
 * @description This function deletes a Visitor with the specific ID
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @param {number} id - the ID number of the Visitor
 * @returns {object} - The response object
 */
const deleteVisitor = async (req, res) => {
  try {
    const visitor = await prisma.visitor.findUnique({
      where: { id: Number(req.params.id) },
    });

    if (!visitor) {
      return res
        .status(404)
        .json({ msg: `No Visitor with the id: ${req.params.id} found` });
    }

    await prisma.visitor.delete({
      where: { id: Number(req.params.id) },
    });

    return res.json({
      msg: `Visitor with the id: ${req.params.id} successfully deleted`,
    });
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    });
  }
};

export { createVisitor, getVisitors, getVisitor, updateVisitor, deleteVisitor };
