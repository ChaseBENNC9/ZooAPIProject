# s2-23-project-ChaseBENNC9

## Description 
This is my Rest API for Project 1 of ID607001. My API is a Zoo management system which keeps track of information about Zoo's It contains information about The Zoo, It's Enclosures, The Animals the Visitiors , Workers and Available Tour Groups in each Zoo. Each Visitor is created per visit per zoo, So Someone who visits two zoo's in the system will have a different ID and Ticket Price depending on the policy of the Zoo.

This API is developed using Node and Express and it has been deployed to a service called Render which also hosts the PostgreSQL Database, the Database is managed using Prisma and PostgreSQL.


## Important Links

**Render Web Service:**
This is the link to the Web service hosted by render
**Documentation:**
This is the link to the documentation of the API using Postman it contains examples for Post, Get , Put and Delete for each model.

## Entity Relationship Diagram
Here is the Entity Relationship Diagram for my Database that i created using Lucid Chart.

## How to setup the enviroment
- open the folder in visual studio code
- open a new terminal and run `npm install`

## Running the API Locally

- In the terminal run: `npm run dev`

## Create and Apply a Migration

- In the terminal run: `npm migrate`

## Reset the Database

- In the terminal run the command `npm run reset`

## Open Prisma Studio

- to run prisma studio run the command `npm run studio`

## Formatting

- to format the code run the command `npm run format`
