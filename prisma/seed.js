import { PrismaClient } from "@prisma/client";
import animalSeed from "../data/animalSeed.json" assert { type: "json" };
import zooSeed from "../data/zooSeed.json" assert { type: "json" };
import visitorSeed from "../data/visitorSeed.json" assert { type: "json" };
import enclosureSeed from "../data/enclosureSeed.json" assert { type: "json" };
import workerSeed from "../data/workerSeed.json" assert { type: "json" };
import tourGroupSeed from "../data/tourGroupSeed.json" assert { type: "json" };
const prisma = new PrismaClient();

const main = async () => {
  try {
    const deleteZoos = await prisma.zoo.deleteMany({});
    const deleteVisitors = await prisma.visitor.deleteMany({});
    const deleteAnimals = await prisma.animal.deleteMany({});
    const deleteTourGroups = await prisma.tourGroup.deleteMany({});
    const deleteWorkers = await prisma.worker.deleteMany({});
    const deleteEnclosures = await prisma.enclosure.deleteMany({});
    await prisma.zoo.createMany({
      data: zooSeed,
    });
    await prisma.visitor.createMany({
      data: visitorSeed,
    });
    await prisma.enclosure.createMany({
      data: enclosureSeed,
    });
    await prisma.animal.createMany({
      data: animalSeed,
    });
    await prisma.worker.createMany({
      data: workerSeed,
    });
    await prisma.tourGroup.createMany({
      data: tourGroupSeed,
    });

    console.log("Database successfully seeded");

    await prisma.$disconnect(); // Disconnect from the database
  } catch (err) {
    console.error(err);
    await prisma.$disconnect();
    process.exit(1); // Exit the process
  }
};

main();
