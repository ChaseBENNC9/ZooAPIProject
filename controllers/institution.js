import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

  const getInstitutions = async (req, res) => {
    try {
      const institutions = await prisma.institution.findMany({
        include: {
            departments: true,
        },
      });
  
      if (institutions.length === 0) {
        return res.status(404).json({ msg: "No institutions found" });
      }
  
      return res.json({ data: institutions });
    } catch (err) {
      return res.status(500).json({
        msg: err.message,
      });
    }
  };




  export {
    getInstitutions,
  };