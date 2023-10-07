import chai from "chai";
import chaiHttp from "chai-http";
import { describe, it } from "mocha";
import { testStatusCreate, testStatusGetAll, testStatusGetOne, testStatusUpdate, testStatusDelete } from "./statusCodes.js";
const statusCreate = 201;
const statusGood = 200;
const endpoints = ["zoos", "visitors", "animals", "enclosures", "workers", "tourGroups"];
const postData =
{
    zoos:
    {
        id:100,
        name: "Some Zoo in Dunedin",
        city: "Dunedin",
        country: "New Zealand",
        established: "2021-01-01T00:00:00.000Z",
    },
    visitors: {
        id:100,
        zooId: 1,
        firstName: "Johnny",
        lastName: "Samston",
        ticketType: "ADULT",
        ticketCost: 11,
        visitDate: "2021-01-01T00:00:00.000Z",
    },
    workers: {
        id:100,
        zooId: 1,
        firstName: "Works",
        lastName: "atAZoo",
        hireDate: "2021-01-01T00:00:00.000Z",
    },
    animals:
    {
        id:100,
        enclosureId: 1,
        name: "LarryBarry",
        species: "Lion",
        sex: "MALE",
        birthDate: "2019-01-01T00:00:00.000Z",
    },
    enclosures:
    {
        id:100,
        zooId: 1,
        name: "The Other Penguin Enclosure",
        type: "Habitat",
        temporary: false,
    },
    tourGroups:
    {
        id:100,
        workerId: 3,
        enclosureId: 11,
        startTime: "2019-01-01T10:00:00Z",
        description: "generic description!"
    }
}

const putData =
{
    zoos:
    {
        name: "Some New Zoo in Dunedin",
    },
    visitors: 
    {
        ticketType: "SENIOR",
    },
    workers: {
        zooId: 1,
        firstName: "Worked",
        terminationDate: "2021-01-01T00:00:00.000Z"
    },
    animals:
    {
        deathDate: "2025-01-01T00:00:00.000Z",
    },
    enclosures:
    {
        temporary: true,
    },
    tourGroups:
    {
        description: "some really generic description!"
    }
}
describe("Status Codes", () => {
    endpoints.forEach((endpoint) => {
        testStatusCreate(endpoint,postData[endpoint]);
        testStatusGetAll(endpoint);
        testStatusGetOne(endpoint);
        testStatusUpdate(endpoint,putData[endpoint],100);
        testStatusDelete(endpoint,100);
    });
});
