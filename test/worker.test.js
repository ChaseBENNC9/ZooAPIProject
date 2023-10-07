import chai from "chai";
import chaiHttp from "chai-http";
import { describe, it } from "mocha";
import { testStatusCreate, testStatusGetAll, testStatusGetOne, testStatusUpdate, testStatusDelete } from "./statusCodesTests.js";

import app from "../index.js";
import { testFiltering, testPagination, testSorting } from "./queryTests.js";

chai.use(chaiHttp);

const Worker = {
    zooId: 1,
    firstName: "Works",
    lastName: "atAZoo",
    hireDate: "2021-01-01T00:00:00.000Z",
};

describe("Workers", () => {

testSorting("workers")

  testFiltering("workers", "firstName", "John");

  testPagination("workers", 5);
  it("should create a Worker", (done) => {
    chai
      .request(app)
      .post("/api/v1/workers")
      .send(Worker)
      .end((req, res) => {
        chai.expect(res.body).to.be.a("object");
        chai.expect(res.body.msg).to.be.equal("Worker successfully created");
        done();
      });
  });
  it("should not create Worker", (done) => {
    chai
      .request(app)
      .post("/api/v1/workers")
      .send(
        {
          zooId: 1,
          lastName: "atAZoo",
          hireDate: "2021-01-01T00:00:00.000Z",
      }
      )
      .end((req, res) => {
        chai.expect(res.body).to.be.a("object");
        chai.expect(res.body.msg).to.be.equal("First Name is required");
        done();
      });
  });


  it("should get all Workers", (done) => {
    chai
      .request(app)
      .get("/api/v1/workers")
      .end((req, res) => {
        chai.expect(res.body).to.be.a("object");
        chai.expect(res.body.data).to.be.a("array");
        done();
      });
  });

  it("should get Worker by id", (done) => {
    chai
      .request(app)
      .get("/api/v1/workers/1")
      .end((req, res) => {
        chai.expect(res.body).to.be.a("object");
        chai.expect(res.body.data).to.be.a("object");
        done();
      });
  });

  it("should update Worker by id", (done) => {
    chai
      .request(app)
      .put("/api/v1/workers/1")
      .send({
        terminationDate: "2023-10-06T00:00:00.000Z",
      })
      .end((req, res) => {
        chai.expect(res.body).to.be.a("object");
        chai
          .expect(res.body.msg)
          .to.be.equal("Worker with the id: 1 successfully updated");
        done();
      });
  });
  it("should Not update Worker by id", (done) => {
    chai
      .request(app)
      .put("/api/v1/workers/1")
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

  it("should delete Worker by id", (done) => {
    chai
      .request(app)
      .delete("/api/v1/workers/1")
      .end((req, res) => {
        chai.expect(res.body).to.be.a("object");
        chai
          .expect(res.body.msg)
          .to.be.equal("Worker with the id: 1 successfully deleted");
        done();
      });
  });

  testStatusCreate("workers", {
    zooId: 1,
    firstName: "Works",
    lastName: "atAZoo",
    hireDate: "2021-01-01T00:00:00.000Z",
});
  testStatusGetAll("workers");
  testStatusGetOne("workers");
  testStatusUpdate("workers", {
    firstName: "Worked",
    terminationDate: "2023-10-06T00:00:00.000Z",
});
  testStatusDelete("workers");
});
