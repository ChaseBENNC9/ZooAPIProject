# s2-23-project-ChaseBENNC9

## Description 
This is my Rest API for Project 1 of ID607001. My API is a Zoo management system which keeps track of information about Zoo's It contains information about The Zoo, It's Enclosures, The Animals the Visitiors , Workers and Available Tour Groups in each Zoo. Each Visitor is created per visit per zoo, So Someone who visits two zoo's in the system will have a different ID and Ticket Price depending on the policy of the Zoo.

This API is developed using Node and Express and it has been deployed to a service called Render which also hosts the PostgreSQL Database, the Database is managed using Prisma and PostgreSQL.


## Important Links

**Render Web Service:**
This is the link to the Web service hosted by render
https://id607001-bennc9-bit.onrender.com/api

**Documentation:**
This is the link to the documentation of the API using Postman it contains examples for Post, Get , Put and Delete for each model.

## Entity Relationship Diagram
Here is the Entity Relationship Diagram for my Database that i created using Lucid Chart.
### Software

**Note:** The IDE I used was Visual Studio Code. The following commands are executed from within VS Code using the built-in terminal. They can also be run in a regular terminal by opening it inside the root folder of the project.

### How to setup the enviroment
- in the terminal runL `npm install`

### Running the API Locally
- In the terminal run: `npm run dev`

### Create and Apply a Migration

- In the terminal run: `npm migrate`

### Reset the Database
- In the terminal run the command `npm run reset`

### Open Prisma Studio

- to run prisma studio run the command `npm run studio`

### Formatting
this project uses prettier for all formatting 
to format all the files run the command `npm run format`
