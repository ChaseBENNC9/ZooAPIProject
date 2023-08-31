import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

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
  
  const getZoos = async (req, res) => {
    try {
      const zoos = await prisma.zoo.findMany({

    });
  
      if (zoos.length === 0) {
        return res.status(404).json({ msg: "No zoos found" });
      }
  
      return res.json({ data: zoos });
    } catch (err) {
      return res.status(500).json({
        msg: err.message,
      });
    }
  };

    const getZoo = async (req, res) => {
    try {
      const zoo = await prisma.zoo.findUnique({
        where: { id: Number(req.params.id) },
      });
  
      if (!zoo) {
        return res
          .status(404)
          .json({ msg: `No zoo with the id: ${req.params.id} found` });
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

  const updateZoo = async (req, res) => {
    try {
      let zoo = await prisma.zoo.findUnique({
        where: { id: Number(req.params.id) },
      });
  
      if (!zoo) {
        return res
          .status(404)
          .json({ msg: `No zoo with the id: ${req.params.id} found` });
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

  const deleteZoo = async (req, res) => {
    try {
      const zoo = await prisma.zoo.findUnique({
        where: { id: Number(req.params.id) },
      });
  
      if (!zoo) {
        return res
          .status(404)
          .json({ msg: `No zoo with the id: ${req.params.id} found` });
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

  export {
    createZoo,
    getZoos,
    getZoo,
    updateZoo,
    deleteZoo,
  };