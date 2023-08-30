// import { PrismaClient } from "@prisma/client";
// const prisma = new PrismaClient();

// const main = async () => {
//   try {
//     await prisma.institution.create({
//       data: {
//         name: "Otago Polytechnic",
//         region: "Otago",
//         country: "New Zealand",
//         departments: { // Seed departments at the same time
//           create: [
//             {
//               name: "Information Technology",
//               // You do not need to add the institutionId because it is automatically added by Prisma
//             },
//             // Add more departments as objects here
//           ],
//         },
//       },
//     });

//     console.log("Database successfully seeded");

//     await prisma.$disconnect(); // Disconnect from the database
//   } catch (err) {
//     console.error(err);
//     await prisma.$disconnect(); 
//     process.exit(1); // Exit the process
//   }
// };

// main();