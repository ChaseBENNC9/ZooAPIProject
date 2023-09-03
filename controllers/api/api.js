import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const createModel = (modelName) => async (req, res) => {
  try {
    await prisma[modelName].create({
      data: { ...req.body },
    });

    const newModels = await prisma[modelName].findMany();

    return res.status(201).json({
      msg: `${modelName} successfully created`,
      data: newModels,
    });
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    });
  }
};

const getModels = (modelName) => async (req, res) => {
  try {
    const institutions = await prisma[modelName].findMany({});

    if (institutions.length === 0) {
      return res.status(404).json({ msg: `No ${modelName}'s  found` });
    }

    return res.json({ data: institutions });
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    });
  }
};

const getModel = (modelName) => async (req, res) => {
  try {
    const institution = await prisma[modelName].findUnique({
      where: { id: Number(req.params.id) },
    });

    if (!institution) {
      return res
        .status(404)
        .json({ msg: `No ${modelName} with the id: ${req.params.id} found` });
    }

    return res.json({
      data: institution,
    });
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    });
  }
};

const updateModel = (modelName) => async (req, res) => {
  try {
    let institution = await prisma[modelName].findUnique({
      where: { id: Number(req.params.id) },
    });

    if (!institution) {
      return res
        .status(404)
        .json({ msg: `No ${modelName} with the id: ${req.params.id} found` });
    }

    institution = await prisma[modelName].update({
      where: { id: Number(req.params.id) },
      data: { ...req.body },
    });

    return res.json({
      msg: `${modelName} with the id: ${req.params.id} successfully updated`,
      data: institution,
    });
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    });
  }
};

const deleteModel = (modelName) => async (req, res) => {
  try {
    const institution = await prisma[modelName].findUnique({
      where: { id: Number(req.params.id) },
    });

    if (!institution) {
      return res
        .status(404)
        .json({ msg: `No ${modelName} with the id: ${req.params.id} found` });
    }

    await prisma[modelName].delete({
      where: { id: Number(req.params.id) },
    });

    return res.json({
      msg: `${modelName} with the id: ${req.params.id} successfully deleted`,
    });
  } catch (err) {
    return res.status(500).json({
      msg: err.message,
    });
  }
};

export { createModel, getModels, getModel, updateModel, deleteModel };
