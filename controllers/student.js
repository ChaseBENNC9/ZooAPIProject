import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const createStudent = async (req, res) => {
    try {
      await prisma.student.create({
        data: { ...req.body },
      });
  
      const newStudents = await prisma.student.findMany();
  
      return res.status(201).json({
        msg: "student successfully created",
        data: newStudents,
      });
    } catch (err) {
      return res.status(500).json({
        msg: err.message,
      });
    }
  };

  const getStudents = async (req, res) => {
    try {
      const Students = await prisma.student.findMany();
  
      if (Students.length === 0) {
        return res.status(404).json({ msg: "No Students found" });
      }
  
      return res.json({ data: Students });
    } catch (err) {
      return res.status(500).json({
        msg: err.message,
      });
    }
  };

  const getStudent = async (req, res) => {
    try {
      const student = await prisma.student.findUnique({
        where: { id: Number(req.params.id) },
      });
  
      if (!student) {
        return res
          .status(404)
          .json({ msg: `No student with the id: ${req.params.id} found` });
      }
  
      return res.json({
        data: student,
      });
    } catch (err) {
      return res.status(500).json({
        msg: err.message,
      });
    }
  };

  const updateStudent = async (req, res) => {
    try {
      let student = await prisma.student.findUnique({
        where: { id: Number(req.params.id) },
      });
  
      if (!student) {
        return res
          .status(404)
          .json({ msg: `No student with the id: ${req.params.id} found` });
      }
  
      student = await prisma.student.update({
        where: { id: Number(req.params.id) },
        data: { ...req.body },
      });
  
      return res.json({
        msg: `student with the id: ${req.params.id} successfully updated`,
        data: student,
      });
    } catch (err) {
      return res.status(500).json({
        msg: err.message,
      });
    }
  };

  const deleteStudent = async (req, res) => {
    try {
      const student = await prisma.student.findUnique({
        where: { id: Number(req.params.id) },
      });
  
      if (!student) {
        return res
          .status(404)
          .json({ msg: `No student with the id: ${req.params.id} found` });
      }
  
      await prisma.student.delete({
        where: { id: Number(req.params.id) },
      });
  
      return res.json({
        msg: `student with the id: ${req.params.id} successfully deleted`,
      });
    } catch (err) {
      return res.status(500).json({
        msg: err.message,
      });
    }
  };

  export {
    createStudent,
    getStudents,
    getStudent,
    updateStudent,
    deleteStudent,
  };