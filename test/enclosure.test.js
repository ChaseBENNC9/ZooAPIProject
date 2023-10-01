import chai from "chai";
import chaiHttp from "chai-http";
import { describe, it } from "mocha";

import app from "../index.js";

chai.use(chaiHttp);

const Enclosure = {
  zooId: 1,
  name: "The Penguin Enclosure",
  type: "Habitat",
  temporary: false,
};

describe("Enclosures", () => {
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
});