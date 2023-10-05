import chai from "chai";
import chaiHttp from "chai-http";
import { describe, it } from "mocha";

import app from "../index.js";

chai.use(chaiHttp);

const Zoo = {
  name: "Zoo of Otago",
  city: "Dunedin",
  country: "New Zealand",
  established: "2021-01-01T00:00:00.000Z",
};

describe("Zoos", () => {
//Sorting
  it("should sort Zoos descending by id", (done) => {
    chai
        .request(app)
        .get("/api/v1/zoos?sortBy=id&sortOrder=desc")
        .end((req, res) => {
            chai.expect(res.body.data).to.be.a("array");
            console.log(res.body.data.length);
            chai.expect(res.body.data[0].id).to.be.equal(res.body.data.length);
            done();
        });
});
//Filtering


//Pagination
  it("should create Zoo", (done) => {
    chai
      .request(app)
      .post("/api/v1/zoos")
      .send(Zoo)
      .end((req, res) => {
        chai.expect(res.status).to.be.equal(201);
        chai.expect(res.body).to.be.a("object");
        chai.expect(res.body.msg).to.be.equal("Zoo successfully created");
        done();
      });
  });

  it("should get all Zoos", (done) => {
    chai
      .request(app)
      .get("/api/v1/zoos")
      .end((req, res) => {
        chai.expect(res.status).to.be.equal(200);
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
        chai.expect(res.status).to.be.equal(200);
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
        chai.expect(res.status).to.be.equal(200);
        chai.expect(res.body).to.be.a("object");
        chai
          .expect(res.body.msg)
          .to.be.equal("Zoo with the id: 1 successfully updated");
        done();
      });
  });

  it("should delete Zoo by id", (done) => {
    chai
      .request(app)
      .delete("/api/v1/zoos/1")
      .end((req, res) => {
        chai.expect(res.status).to.be.equal(200);
        chai.expect(res.body).to.be.a("object");
        chai
          .expect(res.body.msg)
          .to.be.equal("Zoo with the id: 1 successfully deleted");
        done();
      });
  });
});
