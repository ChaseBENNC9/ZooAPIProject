import chai from "chai";
import chaiHttp from "chai-http";
import { describe, it } from "mocha";

import app from "../index.js";

chai.use(chaiHttp);

const Worker = {
    zooId: 1,
    firstName: "Works",
    lastName: "atAZoo",
    hireDate: "2021-01-01T00:00:00.000Z",
};

describe("Workers", () => {
  it("should create Worker", (done) => {
    chai
      .request(app)
      .post("/api/v1/workers")
      .send(Worker)
      .end((req, res) => {
        chai.expect(res.status).to.be.equal(201);
        chai.expect(res.body).to.be.a("object");
        chai.expect(res.body.msg).to.be.equal("Worker successfully created");
        done();
      });
  });

  it("should get all Workers", (done) => {
    chai
      .request(app)
      .get("/api/v1/workers")
      .end((req, res) => {
        chai.expect(res.status).to.be.equal(200);
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
        chai.expect(res.status).to.be.equal(200);
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
        chai.expect(res.status).to.be.equal(200);
        chai.expect(res.body).to.be.a("object");
        chai
          .expect(res.body.msg)
          .to.be.equal("Worker with the id: 1 successfully updated");
        done();
      });
  });

  it("should delete Worker by id", (done) => {
    chai
      .request(app)
      .delete("/api/v1/workers/1")
      .end((req, res) => {
        chai.expect(res.status).to.be.equal(200);
        chai.expect(res.body).to.be.a("object");
        chai
          .expect(res.body.msg)
          .to.be.equal("Worker with the id: 1 successfully deleted");
        done();
      });
  });
});
