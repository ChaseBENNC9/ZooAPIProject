import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const createServer = async (req, res) => {
    try {
      await prisma.server.create({
        data: { ...req.body },
      });
  
      const newServers = await prisma.server.findMany();
  
      return res.status(201).json({
        msg: "server successfully created",
        data: newServers,
      });
    } catch (err) {
      return res.status(500).json({
        msg: err.message,
      });
    }
  };

  const getServers = async (req, res) => {
    try {
      const Servers = await prisma.server.findMany();
  
      if (Servers.length === 0) {
        return res.status(404).json({ msg: "No Servers found" });
      }
  
      return res.json({ data: Servers });
    } catch (err) {
      return res.status(500).json({
        msg: err.message,
      });
    }
  };

  const getServer = async (req, res) => {
    try {
      const server = await prisma.server.findUnique({
        where: { id: Number(req.params.id) },
      });
  
      if (!server) {
        return res
          .status(404)
          .json({ msg: `No server with the id: ${req.params.id} found` });
      }
  
      return res.json({
        data: server,
      });
    } catch (err) {
      return res.status(500).json({
        msg: err.message,
      });
    }
  };

  const updateServer = async (req, res) => {
    try {
      let server = await prisma.server.findUnique({
        where: { id: Number(req.params.id) },
      });
  
      if (!server) {
        return res
          .status(404)
          .json({ msg: `No server with the id: ${req.params.id} found` });
      }
  
      server = await prisma.server.update({
        where: { id: Number(req.params.id) },
        data: { ...req.body },
      });
  
      return res.json({
        msg: `server with the id: ${req.params.id} successfully updated`,
        data: server,
      });
    } catch (err) {
      return res.status(500).json({
        msg: err.message,
      });
    }
  };

  const deleteServer = async (req, res) => {
    try {
      const server = await prisma.server.findUnique({
        where: { id: Number(req.params.id) },
      });
  
      if (!server) {
        return res
          .status(404)
          .json({ msg: `No server with the id: ${req.params.id} found` });
      }
  
      await prisma.server.delete({
        where: { id: Number(req.params.id) },
      });
  
      return res.json({
        msg: `server with the id: ${req.params.id} successfully deleted`,
      });
    } catch (err) {
      return res.status(500).json({
        msg: err.message,
      });
    }
  };

  export {
    createServer,
    getServers,
    getServer,
    updateServer,
    deleteServer,
  };