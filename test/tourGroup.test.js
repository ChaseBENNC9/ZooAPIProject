/**
 * @file This file manages the testing for the TourGroup model, it tests for CRUD operations , validation and imports testing for queries and status codes
 * @author Chase Bennett-Hill
 */

import chai from "chai";
import chaiHttp from "chai-http";
import { describe, it } from "mocha";
import { testStatusCreate, testStatusGetAll, testStatusGetOne, testStatusUpdate, testStatusDelete } from "./statusCodesTests.js";
import { testFiltering, testPagination, testSorting } from "./queryTests.js";
import app from "../index.js";

chai.use(chaiHttp);

const TourGroup =     {
    workerId: 5,
    enclosureId: 15,
    startTime: "2019-01-01T10:00:00Z",
    description: "Come see the famouus Dolphins!"
};

describe("TourGroups", () => {

  testSorting("tourGroups");
  testFiltering("tourGroups", "workerId", 3);
  testPagination("tourGroups",2);

  it("should create TourGroup", (done) => {
    chai
      .request(app)
      .post("/api/v1/tourGroups")
      .send(TourGroup)
      .end((req, res) => {
        chai.expect(res.status).to.be.equal(201);
        chai.expect(res.body).to.be.a("object");
        chai.expect(res.body.msg).to.be.equal("TourGroup successfully created");
        done();
      });
  });
  it("should not create TourGroup", (done) => {
    chai
      .request(app)
      .post("/api/v1/tourGroups")
      .send({
        workerId: 5,
        enclosureId: 15,
        startTime: "2019-01-01T10:00:00Z",
    })
      .end((req, res) => {
        chai.expect(res.body).to.be.a("object");
        chai.expect(res.body.msg).to.be.equal("Description is required");
        done();
      });
  });

  it("should get all TourGroups", (done) => {
    chai
      .request(app)
      .get("/api/v1/tourGroups")
      .end((req, res) => {
        chai.expect(res.status).to.be.equal(200);
        chai.expect(res.body).to.be.a("object");
        chai.expect(res.body.data).to.be.a("array");
        done();
      });
  });

  it("should get tourGroup by id", (done) => {
    chai
      .request(app)
      .get("/api/v1/tourGroups/3")
      .end((req, res) => {
        chai.expect(res.status).to.be.equal(200);
        chai.expect(res.body).to.be.a("object");
        chai.expect(res.body.data).to.be.a("object");
        done();
      });
  });

  it("should update TourGroup by id", (done) => {
    chai
      .request(app)
      .put("/api/v1/tourGroups/3")
      .send({
        description: "Come and see the famous Bottlenosed Dolphins!",
      })
      .end((req, res) => {
        chai.expect(res.status).to.be.equal(200);
        chai.expect(res.body).to.be.a("object");
        chai
          .expect(res.body.msg)
          .to.be.equal("TourGroup with the id: 3 successfully updated");
        done();
      });
  });

  it("should not update TourGroup by id", (done) => {
    chai
      .request(app)
      .put("/api/v1/tourGroups/3")
      .send({
        description: "Twelve",
      })
      .end((req, res) => {
        chai.expect(res.body).to.be.a("object");
        chai
          .expect(res.body.msg)
          .to.be.equal("Description should have a minimum length of 30");
        done();
      });
  });
  it("should delete TourGroup by id", (done) => {
    chai
      .request(app)
      .delete("/api/v1/tourGroups/3")
      .end((req, res) => {
        chai.expect(res.status).to.be.equal(200);
        chai.expect(res.body).to.be.a("object");
        chai
          .expect(res.body.msg)
          .to.be.equal("TourGroup with the id: 3 successfully deleted");
        done();
      });
  });
  testStatusCreate("tourGroups",  
    {
        workerId: 5,
        enclosureId: 15,
        startTime: "2019-01-01T10:00:00Z",
        description: "Come see the famouus Dolphins!"
    }
);
testStatusGetAll("tourGroups");
testStatusGetOne("tourGroups");
testStatusUpdate("tourGroups", {
  description: "This was the Old Penguin TourGroup",
});
testStatusDelete("tourGroups");
});
