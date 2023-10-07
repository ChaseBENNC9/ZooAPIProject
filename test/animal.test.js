import chai from "chai";
import chaiHttp from "chai-http";
import { describe, it } from "mocha";

import app from "../index.js";

chai.use(chaiHttp);

const Animal = {
    enclosureId: 1,
    name: "Larry2",
    species: "Lion",
    sex: "MALE",
    birthDate: "2019-01-01T00:00:00.000Z",
};

describe("Animals", () => {
//Sorting
it("should sort animals descending by id", (done) => {
    chai
        .request(app)
        .get("/api/v1/animals?sortBy=id&sortOrder=desc")
        .end((req, res) => {
            chai.expect(res.body.data).to.be.a("array");
            console.log(res.body.data.length);
            chai.expect(res.body.data[0].id).to.be.greaterThan(res.body.data[1].id);
            done();
        });
});
//Filtering
it("Should return an Orca", (done) => {
  chai.request(app)
  .get("/api/v1/animals?species=Orca")
  .end((req, res) => {
      chai.expect(res.body.data).to.be.a("array");
      chai.expect(res.body.data[0].species).to.be.equal("Orca");
      done();
  });
});

//Pagination
it("Should return `12 Animals", (done) => {
  chai
      .request(app)
      .get("/api/v1/animals?count=12")
      .end((req, res) => {
          chai.expect(res.body.data).to.be.a("array");
          chai.expect(res.body.data.length).to.be.equal(12);
          done();
      });
});




    it("should create Animal", (done) => {
        chai
            .request(app)
            .post("/api/v1/animals")
            .send(Animal)
            .end((req, res) => {
                chai.expect(res.body).to.be.a("object");
                chai.expect(res.body.msg).to.be.equal("Animal successfully created");
                done();
            });
    });
    
    it("should not create an Animal", (done) => {
        chai.request(app)
        .post("/api/v1/animals")
        .send({
            enclosureId: 1,
            species: "Lion",
            sex: "MALE",
            birthDate: "2019-01-01T00:00:00.000Z",
        })
        .end((req, res) => {
            chai.expect(res.body).to.be.a("object");
            chai.expect(res.body.msg).to.be.equal("Name is required");
            done();
        });

    });


    it("should get all Animals", (done) => {
        chai
            .request(app)
            .get("/api/v1/animals")
            .end((req, res) => {
                chai.expect(res.body).to.be.a("object");
                chai.expect(res.body.data).to.be.a("array");
                done();
            });
    });

    it("should get animal by id", (done) => {
        chai
            .request(app)
            .get("/api/v1/animals/1")
            .end((req, res) => {
                chai.expect(res.body).to.be.a("object");
                chai.expect(res.body.data).to.be.a("object");
                done();
            });
    });

    it("should update animal by id", (done) => {
        chai
            .request(app)
            .put("/api/v1/animals/1")
            .send({
                deathDate: "2023-05-10T00:00:00.000Z",
            })
            .end((req, res) => {
                chai.expect(res.body).to.be.a("object");
                chai
                    .expect(res.body.msg)
                    .to.be.equal("Animal with the id: 1 successfully updated");
                done();
            });
    });
    it("should not update animal by id", (done) => {
        chai
            .request(app)
            .put("/api/v1/animals/1")
            .send({
                name: 7
            })
            .end((req, res) => {
                chai.expect(res.body).to.be.a("object");
                chai
                    .expect(res.body.msg)
                    .to.be.equal("Name should be a string");
                done();
            });
    });


    it("should delete animals by id", (done) => {
        chai
            .request(app)
            .delete("/api/v1/animals/1")
            .end((req, res) => {
                chai.expect(res.body).to.be.a("object");
                chai
                    .expect(res.body.msg)
                    .to.be.equal("Animal with the id: 1 successfully deleted");
                done();
            });
    });




});
