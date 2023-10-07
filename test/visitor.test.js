/**
 * @file This file manages the testing for the visitor model, it tests for CRUD operations , validation and imports testing for queries and status codes
 * @author Chase Bennett-Hill
*/

import chai from "chai";
import chaiHttp from "chai-http";
import { describe, it } from "mocha";
import { testStatusCreate, testStatusGetAll, testStatusGetOne, testStatusUpdate, testStatusDelete } from "./statusCodesTests.js";

import app from "../index.js";
import { testFiltering, testPagination, testSorting } from "./queryTests.js";

chai.use(chaiHttp);

const Visitor = {
  zooId: 1,
  firstName: "Perry",
  lastName: "ThePlatypus",
  ticketType: "ADULT",
  ticketCost: 11,
  visitDate: "2021-01-01T00:00:00.000Z",
};

describe("Visitors", () => {

  testSorting("visitors");

  testFiltering("visitors", "ticketType", "ADULT");

  testPagination("visitors", 5);
  it("should create Visitor", (done) => {
    chai
      .request(app)
      .post("/api/v1/visitors")
      .send(Visitor)
      .end((req, res) => {
        chai.expect(res.status).to.be.equal(201);
        chai.expect(res.body).to.be.a("object");
        chai.expect(res.body.msg).to.be.equal("Visitor successfully created");
        done();
      });
  });
  it("should not create Visitor", (done) => {
    chai
      .request(app)
      .post("/api/v1/visitors")
      .send(
        {

          zooId: 1,
          lastName: "ThePlatypus",
          ticketType: "ADULT",
          ticketCost: 11,
          visitDate: "2021-01-01T00:00:00.000Z",

        }
      )
      .end((req, res) => {
        chai.expect(res.body).to.be.a("object");
        chai.expect(res.body.msg).to.be.equal("First Name is required");
        done();
      });
  });
  it("should get all Visitors", (done) => {
    chai
      .request(app)
      .get("/api/v1/visitors")
      .end((req, res) => {
        chai.expect(res.status).to.be.equal(200);
        chai.expect(res.body).to.be.a("object");
        chai.expect(res.body.data).to.be.a("array");
        done();
      });
  });

  it("should get Visitor by id", (done) => {
    chai
      .request(app)
      .get("/api/v1/visitors/1")
      .end((req, res) => {
        chai.expect(res.status).to.be.equal(200);
        chai.expect(res.body).to.be.a("object");
        chai.expect(res.body.data).to.be.a("object");
        done();
      });
  });

  it("should update Visitor by id", (done) => {
    chai
      .request(app)
      .put("/api/v1/visitors/1")
      .send({
        visitDate: "2021-05-01T00:00:00.000Z",
      })
      .end((req, res) => {
        chai.expect(res.status).to.be.equal(200);
        chai.expect(res.body).to.be.a("object");
        chai
          .expect(res.body.msg)
          .to.be.equal("Visitor with the id: 1 successfully updated");
        done();
      });
  });
  it("should Not update Visitor by id", (done) => {
    chai
      .request(app)
      .put("/api/v1/visitors/1")
      .send({
        firstName: 12,
      })
      .end((req, res) => {
        chai.expect(res.body).to.be.a("object");
        chai
          .expect(res.body.msg)
          .to.be.equal("First Name should be a string");
        done();
      });
  });

  it("should delete Visitor by id", (done) => {
    chai
      .request(app)
      .delete("/api/v1/visitors/1")
      .end((req, res) => {
        chai.expect(res.status).to.be.equal(200);
        chai.expect(res.body).to.be.a("object");
        chai
          .expect(res.body.msg)
          .to.be.equal("Visitor with the id: 1 successfully deleted");
        done();
      });
  });

  // Status Codes Tests
  testStatusCreate("visitors", {
    zooId: 1,
    firstName: "Johnny",
    lastName: "Samston",
    ticketType: "ADULT",
    ticketCost: 11,
    visitDate: "2021-01-01T00:00:00.000Z",
});
  testStatusGetAll("visitors");
  testStatusGetOne("visitors");
  testStatusUpdate("visitors", {
    visitDate: "2021-05-01T00:00:00.000Z",
});
  testStatusDelete("visitors");
});
