import chai from "chai";
import chaiHttp from "chai-http";
import { describe, it } from "mocha";

import app from "../index.js";

chai.use(chaiHttp);

const institution = {
  name: "University of Otago",
  region: "Otago",
  country: "New Zealand",
};

describe("Institutions", () => {
  it("should create institution", (done) => {
    chai
      .request(app)
      .post("/api/institutions")
      .send(institution)
      .end((req, res) => {
        //console.log(res) // This is useful for debugging

        chai.expect(res.status).to.be.equal(201);
        chai.expect(res.body).to.be.a("object");
        chai
          .expect(res.body.msg)
          .to.be.equal("institution successfully created");
        done();
      });
  });

  it("should get all institutions", (done) => {
    chai
      .request(app)
      .get("/api/institutions")
      .end((req, res) => {
       // console.log(res) // This is useful for debugging

        chai.expect(res.status).to.be.equal(200);
        chai.expect(res.body).to.be.a("object");
        chai.expect(res.body.data).to.be.a("array");
        done();
      });
  });

  it("should get institution by id", (done) => {
    chai
      .request(app)
      .get("/api/institutions/1")
      .end((req, res) => {
        //console.log(res) // This is useful for debugging

        chai.expect(res.status).to.be.equal(200);
        chai.expect(res.body).to.be.a("object");
        chai.expect(res.body.data).to.be.a("object");
        done();
      });
  });

  it("should update institution by id", (done) => {
    chai
      .request(app)
      .put("/api/institutions/1")
      .send(institution)
      .end((req, res) => {
        //console.log(res) // This is useful for debugging

        chai.expect(res.status).to.be.equal(200);
        chai.expect(res.body).to.be.a("object");
        chai
          .expect(res.body.msg)
          .to.be.equal("institution with the id: 1 successfully updated");
        done();
      });
  });

  it("should delete institution by id", (done) => { 
    chai
      .request(app)
      .delete("/api/institutions/1")
      .end((req, res) => {
        //console.log(res) // This is useful for debugging

        chai.expect(res.status).to.be.equal(200);
        chai.expect(res.body).to.be.a("object");
        chai
          .expect(res.body.msg)
          .to.be.equal("institution with the id: 1 successfully deleted");
        done();
      });
  });
});