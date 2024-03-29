/**
 * @file This file manages the testing for the Enclosure model, it tests for CRUD operations , validation and imports testing for queries and status codes
 * @author Chase Bennett-Hill
 *  */

import chai from "chai";
import chaiHttp from "chai-http";
import { describe, it } from "mocha";
import {
  testStatusCreate,
  testStatusGetAll,
  testStatusGetOne,
  testStatusUpdate,
  testStatusDelete,
} from "./statusCodesTests.js";
import { testFiltering, testPagination, testSorting } from "./queryTests.js";
import app from "../index.js";

chai.use(chaiHttp);

const Enclosure = {
  zooId: 1,
  name: "The Penguin Enclosure",
  type: "Habitat",
  temporary: false,
};

describe("Enclosures", () => {
  testSorting("enclosures");
  testFiltering("enclosures", "type", "Aquarium");
  testPagination("enclosures", 5);

  it("should create Enclosure", (done) => {
    chai
      .request(app)
      .post("/api/v1/enclosures")
      .send(Enclosure)
      .end((req, res) => {
        chai.expect(res.status).to.be.equal(201);
        chai.expect(res.body).to.be.a("object");
        chai.expect(res.body.msg).to.be.equal("Enclosure successfully created");
        done();
      });
  });
  it("should not create Enclosure", (done) => {
    chai
      .request(app)
      .post("/api/v1/enclosures")
      .send({
        zooId: 1,
        name: "The Penguin Enclosure",
        temporary: false,
      })
      .end((req, res) => {
        chai.expect(res.body).to.be.a("object");
        chai.expect(res.body.msg).to.be.equal("Type is required");
        done();
      });
  });

  it("should get all Enclosures", (done) => {
    chai
      .request(app)
      .get("/api/v1/enclosures")
      .end((req, res) => {
        chai.expect(res.status).to.be.equal(200);
        chai.expect(res.body).to.be.a("object");
        chai.expect(res.body.data).to.be.a("array");
        done();
      });
  });

  it("should get enclosure by id", (done) => {
    chai
      .request(app)
      .get("/api/v1/enclosures/1")
      .end((req, res) => {
        chai.expect(res.status).to.be.equal(200);
        chai.expect(res.body).to.be.a("object");
        chai.expect(res.body.data).to.be.a("object");
        done();
      });
  });

  it("should update Enclosure by id", (done) => {
    chai
      .request(app)
      .put("/api/v1/enclosures/1")
      .send({
        name: "Enclosure of Lions",
      })
      .end((req, res) => {
        chai.expect(res.status).to.be.equal(200);
        chai.expect(res.body).to.be.a("object");
        chai
          .expect(res.body.msg)
          .to.be.equal("Enclosure with the id: 1 successfully updated");
        done();
      });
  });

  it("should not update Enclosure by id", (done) => {
    chai
      .request(app)
      .put("/api/v1/enclosures/1")
      .send({
        visitorCapacity: "Twelve",
      })
      .end((req, res) => {
        chai.expect(res.body).to.be.a("object");
        chai
          .expect(res.body.msg)
          .to.be.equal("Visitor Capacity should be an Integer");
        done();
      });
  });
  it("should delete Enclosure by id", (done) => {
    chai
      .request(app)
      .delete("/api/v1/enclosures/1")
      .end((req, res) => {
        chai.expect(res.status).to.be.equal(200);
        chai.expect(res.body).to.be.a("object");
        chai
          .expect(res.body.msg)
          .to.be.equal("Enclosure with the id: 1 successfully deleted");
        done();
      });
  });
  testStatusCreate("enclosures", {
    zooId: 1,
    name: "The Other Penguin Enclosure",
    type: "Habitat",
    temporary: false,
  });
  testStatusGetAll("enclosures");
  testStatusGetOne("enclosures");
  testStatusUpdate("enclosures", {
    name: "The Old Penguin Enclosure",
  });
  testStatusDelete("enclosures");
});
