import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const createAnimal = async (req, res) => {
    try {
      await prisma.animal.create({
        data: { ...req.body },
      });
  
      const newAnimals = await prisma.animal.findMany();
  
      return res.status(201).json({
        msg: "animal successfully created",
        data: newAnimals,
      });
    } catch (err) {
      return res.status(500).json({
        msg: err.message,
      });
    }
  };

  const getAnimals = async (req, res) => {
    try {
      const Animals = await prisma.animal.findMany();
  
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

  const getAnimal = async (req, res) => {
    try {
      const animal = await prisma.animal.findUnique({
        where: { id: Number(req.params.id) },
      });
  
      if (!animal) {
        return res
          .status(404)
          .json({ msg: `No animal with the id: ${req.params.id} found` });
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

  const updateAnimal = async (req, res) => {
    try {
      let animal = await prisma.animal.findUnique({
        where: { id: Number(req.params.id) },
      });
  
      if (!animal) {
        return res
          .status(404)
          .json({ msg: `No animal with the id: ${req.params.id} found` });
      }
  
      animal = await prisma.animal.update({
        where: { id: Number(req.params.id) },
        data: { ...req.body },
      });
  
      return res.json({
        msg: `animal with the id: ${req.params.id} successfully updated`,
        data: animal,
      });
    } catch (err) {
      return res.status(500).json({
        msg: err.message,
      });
    }
  };

  const deleteAnimal = async (req, res) => {
    try {
      const animal = await prisma.animal.findUnique({
        where: { id: Number(req.params.id) },
      });
  
      if (!animal) {
        return res
          .status(404)
          .json({ msg: `No animal with the id: ${req.params.id} found` });
      }
  
      await prisma.animal.delete({
        where: { id: Number(req.params.id) },
      });
  
      return res.json({
        msg: `animal with the id: ${req.params.id} successfully deleted`,
      });
    } catch (err) {
      return res.status(500).json({
        msg: err.message,
      });
    }
  };

  export {
    createAnimal,
    getAnimals,
    getAnimal,
    updateAnimal,
    deleteAnimal,
  };