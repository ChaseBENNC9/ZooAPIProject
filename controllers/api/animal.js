/**
 * @file Manages all of the Different Animal's
 * @author Chase Bennett-Hill
 *
 */
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

/**
 * @description This function creates a new Animal
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @returns {object} - The response object
 */
const createAnimal = async (req, res) => {
  try {
    await prisma.animal.create({
      data: { ...req.body },
    });

    const newAnimals = await prisma.animal.findMany();

    return res.status(201).json({
      msg: "Animal successfully created",
      data: newAnimals,
    });
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    });
  }
};

/**
 * @description This function gets all of the Animal's in the API
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @returns {object} - The response object
 */
const getAnimals = async (req, res) => {
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
      req.query.enclosureId ||
      req.query.name ||
      req.query.species ||
      req.query.sex ||
      req.query.birthDate ||
      req.query.deathDate
    ) {
      query.where = {
        id: {
          in: parseInt(req.query.id) || undefined,
        },
        enclosureId: {
          in: parseInt(req.query.enclosureId) || undefined,
        },
        name: {
          in: req.query.name || undefined,
        },
        species: {
          in: req.query.species || undefined,
        },
        sex: {
          in: req.query.sex || undefined,
        },
        birthDate: {
          in: req.query.birthDate || undefined,
        },
        deathDate: {
          in: req.query.deathDate || undefined,
        },
      };
    }
    const Animals = await prisma.animal.findMany(query);

    if (Animals.length === 0) {
      return res.status(404).json({ msg: "No Animals found" });
    }

    return res.json({ data: Animals });
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    });
  }
};
/**
 * @description This function gets a Animal with the specific ID
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @param {number} id - the ID number of the Animal
 * @returns {object} - The response object
 */
const getAnimal = async (req, res) => {
  try {
    const animal = await prisma.animal.findUnique({
      where: { id: Number(req.params.id) },
    });

    if (!animal) {
      return res
        .status(404)
        .json({ msg: `No Animal with the id: ${req.params.id} found` });
    }

    return res.json({
      data: animal,
    });
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    });
  }
};
/**
 * @description This function Updates information for an Animal with the specific ID
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @param {number} id - the ID number of the Animal
 * @returns {object} - The response object
 */
const updateAnimal = async (req, res) => {
  try {
    let animal = await prisma.animal.findUnique({
      where: { id: Number(req.params.id) },
    });

    if (!animal) {
      return res
        .status(404)
        .json({ msg: `No Animal with the id: ${req.params.id} found` });
    }

    animal = await prisma.animal.update({
      where: { id: Number(req.params.id) },
      data: { ...req.body },
    });

    return res.json({
      msg: `Animal with the id: ${req.params.id} successfully updated`,
      data: animal,
    });
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    });
  }
};
/**
 * @description This function deletes a Animal with the specific ID
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @param {number} id - the ID number of the Animal
 * @returns {object} - The response object
 */
const deleteAnimal = async (req, res) => {
  try {
    const animal = await prisma.animal.findUnique({
      where: { id: Number(req.params.id) },
    });

    if (!animal) {
      return res
        .status(404)
        .json({ msg: `No Animal with the id: ${req.params.id} found` });
    }

    await prisma.animal.delete({
      where: { id: Number(req.params.id) },
    });

    return res.json({
      msg: `Animal with the id: ${req.params.id} successfully deleted`,
    });
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    });
  }
};

export { createAnimal, getAnimals, getAnimal, updateAnimal, deleteAnimal };
