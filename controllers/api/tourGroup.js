/**
 * @file Manages all of the Different TourGroup's
 * @author Chase Bennett-Hill
 */
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

/**
 * @description This function creates a new TourGroup
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @returns {object} - The response object
 */
const createTourGroup = async (req, res) => {
  try {
    await prisma.tourGroup.create({
      data: { ...req.body },
    });

    const newTourGroups = await prisma.tourGroup.findMany();

    return res.status(201).json({
      msg: "TourGroup successfully created",
      data: newTourGroups,
    });
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    });
  }
};

/**
 * @description This function gets all of the TourGroup's in the API
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @returns {object} - The response object
 */
const getTourGroups = async (req, res) => {
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
      req.query.workerId ||
      req.query.enclosureId ||
      req.query.startTime ||
      req.query.description
    ) {
      query.where = {
        id: {
          in: parseInt(req.query.id) || undefined,
        },
        workerId: {
          in: parseInt(req.query.workerId) || undefined,
        },
        enclosureId: {
          in: parseInt(req.query.enclosureId) || undefined,
        },
        startTime: {
          in: req.query.startTime || undefined,
        },
        description: {
          in: req.query.description || undefined,
        },
      };
    }
    const TourGroups = await prisma.tourGroup.findMany(query);

    if (TourGroups.length === 0) {
      return res.status(404).json({ msg: "No TourGroups found" });
    }

    return res.json({ data: TourGroups });
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    });
  }
};
/**
 * @description This function gets a TourGroup with the specific ID
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @param {number} id - the ID number of the TourGroup
 * @returns {object} - The response object
 */
const getTourGroup = async (req, res) => {
  try {
    const tourGroup = await prisma.tourGroup.findUnique({
      where: { id: Number(req.params.id) },
      include: {
        startLocation: true,
        guide: true,
      },
    });

    if (!tourGroup) {
      return res
        .status(404)
        .json({ msg: `No TourGroup with the id: ${req.params.id} found` });
    }

    return res.json({
      data: tourGroup,
    });
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    });
  }
};
/**
 * @description This function Updates information for an TourGroup with the specific ID
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @param {number} id - the ID number of the TourGroup
 * @returns {object} - The response object
 */
const updateTourGroup = async (req, res) => {
  try {
    let tourGroup = await prisma.tourGroup.findUnique({
      where: { id: Number(req.params.id) },
    });

    if (!tourGroup) {
      return res
        .status(404)
        .json({ msg: `No TourGroup with the id: ${req.params.id} found` });
    }

    tourGroup = await prisma.tourGroup.update({
      where: { id: Number(req.params.id) },
      data: { ...req.body },
    });

    return res.json({
      msg: `TourGroup with the id: ${req.params.id} successfully updated`,
      data: tourGroup,
    });
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    });
  }
};
/**
 * @description This function deletes a TourGroup with the specific ID
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @param {number} id - the ID number of the TourGroup
 * @returns {object} - The response object
 */
const deleteTourGroup = async (req, res) => {
  try {
    const tourGroup = await prisma.tourGroup.findUnique({
      where: { id: Number(req.params.id) },
    });

    if (!tourGroup) {
      return res
        .status(404)
        .json({ msg: `No TourGroup with the id: ${req.params.id} found` });
    }

    await prisma.tourGroup.delete({
      where: { id: Number(req.params.id) },
    });

    return res.json({
      msg: `TourGroup with the id: ${req.params.id} successfully deleted`,
    });
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    });
  }
};

export {
  createTourGroup,
  getTourGroups,
  getTourGroup,
  updateTourGroup,
  deleteTourGroup,
};
