/**
 * @file This file manages the testing for the Zoo model, it tests for CRUD operations , validation and imports testing for queries and status codes
 * @author Chase Bennett-Hill
*/

import chai from "chai";
import chaiHttp from "chai-http";
import { describe, it } from "mocha";

import { testStatusCreate, testStatusGetAll, testStatusGetOne, testStatusUpdate, testStatusDelete } from "./statusCodesTests.js";
import { testFiltering, testPagination, testSorting } from "./queryTests.js";

import app from "../index.js";

chai.use(chaiHttp);

const Zoo = {
  name: "Zoo of Otago",
  city: "Dunedin",
  country: "New Zealand",
  established: "2021-01-01T00:00:00.000Z",
};

describe("Zoos", () => {

testSorting("zoos");
testFiltering("zoos", "country", "Australia");
testPagination("zoos", 2);

  it("should create Zoo", (done) => {
    chai
      .request(app)
      .post("/api/v1/zoos")
      .send(Zoo)
      .end((req, res) => {
        chai.expect(res.body).to.be.a("object");
        chai.expect(res.body.msg).to.be.equal("Zoo successfully created");
        done();
      });
  });
  it("should not create Zoo", (done) => {
    chai
      .request(app)
      .post("/api/v1/zoos")
      .send({
        name: "Zoo of Otago",
        city: "Dunedin",
        established: "2021-01-01T00:00:00.000Z"
      })
      .end((req, res) => {
        chai.expect(res.body).to.be.a("object");
        chai.expect(res.body.msg).to.be.equal("Country is required");
        done();
      });
  });
  it("should get all Zoos", (done) => {
    chai
      .request(app)
      .get("/api/v1/zoos")
      .end((req, res) => {
        chai.expect(res.body).to.be.a("object");
        chai.expect(res.body.data).to.be.a("array");
        done();
      });
  });

  it("should get zoo by id", (done) => {
    chai
      .request(app)
      .get("/api/v1/zoos/1")
      .end((req, res) => {
        chai.expect(res.body).to.be.a("object");
        chai.expect(res.body.data).to.be.a("object");
        done();
      });
  });

  it("should update Zoo by id", (done) => {
    chai
      .request(app)
      .put("/api/v1/zoos/1")
      .send({
        name: "Zoo of Pavlova",
        city: "Melbourne",
        country: "Australia",
        established: "2023-01-01T00:00:00.000Z",
      })
      .end((req, res) => {
        chai.expect(res.body).to.be.a("object");
        chai
          .expect(res.body.msg)
          .to.be.equal("Zoo with the id: 1 successfully updated");
        done();
      });
  });
  it("should Not update Zoo by id", (done) => {
    chai
      .request(app)
      .put("/api/v1/zoos/1")
      .send({

        country: 12,

      })
      .end((req, res) => {
        chai.expect(res.body).to.be.a("object");
        chai
          .expect(res.body.msg)
          .to.be.equal("Country should be a string");
        done();
      });
  });
  it("should delete Zoo by id", (done) => {
    chai
      .request(app)
      .delete("/api/v1/zoos/1")
      .end((req, res) => {
        chai.expect(res.body).to.be.a("object");
        chai
          .expect(res.body.msg)
          .to.be.equal("Zoo with the id: 1 successfully deleted");
        done();
      });
  });

  //Status Codes
  testStatusCreate("zoos",    {
    name: "Some Zoo in Dunedin",
    city: "Dunedin",
    country: "New Zealand",
    established: "2021-01-01T00:00:00.000Z",
});
testStatusGetAll("zoos");
testStatusGetOne("zoos");
testStatusUpdate("zoos", {
  name: "Some Zoo in Auckland",
  city: "Auckland"
});

testStatusDelete("zoos");
});
