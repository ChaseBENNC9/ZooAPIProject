# s2-23-project-ChaseBENNC9

## Description

This is my Rest API for Project 1 of ID607001. My API is a Zoo management system which keeps track of information about Zoo's It contains information about The Zoo, It's Enclosures, The Animals the Visitiors , Workers and Available Tour Groups in each Zoo. Each Visitor is created per visit per zoo, So Someone who visits two zoo's in the system will have a different ID and Ticket Price depending on the policy of the Zoo.

This API is developed using Node and Express and it has been deployed to a service called Render which also hosts the PostgreSQL Database, the Database is managed using Prisma and PostgreSQL.

## Important Links

| Render Web Service                           | Postman Documentation                                      |
| -------------------------------------------- | ---------------------------------------------------------- |
| https://id607001-bennc9-bit.onrender.com/api | https://documenter.getpostman.com/view/28768657/2s9Y5csKZr |

## Entity Relationship Diagram

Here is the Entity Relationship Diagram for my Database that i created using Lucid Chart.
![image](https://github.com/otago-polytechnic-bit-courses/s2-23-project-ChaseBENNC9/assets/104808214/c840f923-782f-4139-afb5-4c1d1f76fa8d)

### Software

**Note:** The IDE I used was Visual Studio Code. The following commands are executed from within VS Code using the built-in terminal. They can also be run in a regular terminal by opening it inside the root folder of the project.

### How to setup the enviroment

- in the terminal runL `npm install`

### Running the API Locally

- In the terminal run: `npm run dev`

### Create and Apply a Migration

- In the terminal run: `npm run migrate`

### Reset the Database

- In the terminal run the command `npm run reset`

### Open Prisma Studio

- to run prisma studio run the command `npm run studio`

### Formatting

this project uses prettier for all formatting
to format all the files run the command `npm run format`

### Seed

to seed the database run the command `npm run seed`

### Testing

To run all the tests for the API run the command `npm run test`

### Referencing

- ChatGPT was used to generate seed data for visitor model
  <img width="493" alt="image" src="https://github.com/otago-polytechnic-bit-courses/s2-23-project-ChaseBENNC9/assets/104808214/34eb6720-32b0-405d-b476-f61ea8b8dec0">
