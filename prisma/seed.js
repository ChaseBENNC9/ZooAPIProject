import { PrismaClient } from "@prisma/client";
import zooSeed from "../data/zooSeed.json" assert { type: "json" };
import { json } from "express";
const prisma = new PrismaClient();

const main = async () => {
  try {
    const deleteZoos = await prisma.zoo.deleteMany({});
    const deleteVisitors = await prisma.visitor.deleteMany({});
    const deleteAnimals = await prisma.animal.deleteMany({});
    await prisma.zoo.create({
      data: zooSeed,
    });
    await prisma.visitor.createMany({
      data: 
      [
        {
          "zooId": 1,
          "firstName": "Chase",
          "lastName": "Bennett-Hill",
          "ticketType": "ADULT",
          "ticketCost": 15.60,
          "visitDate": "2023-01-01T00:00:00Z"
        },
        {
          "zooId": 1,
          "firstName": "Bryan",
          "lastName": "Bennett-Hill",
          "ticketType": "SENIOR",
          "ticketCost": 15.60,
          "visitDate": "2023-01-01T00:00:00Z"
        },
        {
          "zooId": 1,
          "firstName": "John",
          "lastName": "Doe",
          "ticketType": "CHILD",
          "ticketCost": 10.25,
          "visitDate": "2023-01-01T00:00:00Z"
        }
      ]
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
