import chai from "chai";
import chaiHttp from "chai-http";
import { describe, it } from "mocha";

import app from "../index.js";

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
  it("should sort visitors descending by ID", (done) => {
    chai
      .request(app)
      .get("/api/v1/visitors?sortBy=id&sortOrder=desc")
      .end((req, res) => {
        chai.expect(res.body.data).to.be.a("array");
        console.log(res.body.data.length);
        chai.expect(res.body.data[0].id).to.be.greaterThan(res.body.data[1].id);
        done();
      });
  });
  it("Get visitors that have a Senior Ticket ", (done) => {
    chai.request(app)
      .get("/api/v1/visitors?ticketType=SENIOR")
      .end((req, res) => {
        chai.expect(res.body.data).to.be.a("array");
        chai.expect(res.body.data[0].ticketType).to.be.equal("SENIOR");
        done();
      });
  });
  it("should get 5 Workers", (done) => {
    chai
      .request(app)
      .get("/api/v1/visitors?count=5")
      .end((req, res) => {
        chai.expect(res.body.data).to.be.a("array");
        chai.expect(res.body.data.length).to.be.equal(5);
        done();
      });
  });
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
});
