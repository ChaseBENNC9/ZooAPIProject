import chai from "chai";
import chaiHttp from "chai-http";
import { describe, it } from "mocha";

import app from "../index.js";

chai.use(chaiHttp);

const Animal = {
    enclosureId: 1,
    name: "Larry",
    species: "Lion",
    sex: "MALE",
    birthDate: "2019-01-01T00:00:00.000Z",
};

describe("Animals", () => {


    it("should sort animals descending by id", (done) => {
        chai
            .request(app)
            .get("/api/v1/animals?sortBy=id&sortOrder=desc")
            .end((req, res) => {
                chai.expect(res.body.data).to.be.a("array");
                console.log(res.body.data.length);
                chai.expect(res.body.data[0].id).to.be.equal(res.body.data.length);
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


    it("should get all Animals", (done) => {
        chai
            .request(app)
            .get("/api/v1/animals")
            .end((req, res) => {
                chai.expect(res.status).to.be.equal(200);
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
                chai.expect(res.status).to.be.equal(200);
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
                chai.expect(res.status).to.be.equal(200);
                chai.expect(res.body).to.be.a("object");
                chai
                    .expect(res.body.msg)
                    .to.be.equal("Animal with the id: 1 successfully updated");
                done();
            });
    });

    it("should delete animals by id", (done) => {
        chai
            .request(app)
            .delete("/api/v1/animals/1")
            .end((req, res) => {
                chai.expect(res.status).to.be.equal(200);
                chai.expect(res.body).to.be.a("object");
                chai
                    .expect(res.body.msg)
                    .to.be.equal("Animal with the id: 1 successfully deleted");
                done();
            });
    });


    it("should verify Create Status Code", (done) => {
        chai
            .request(app)
            .post("/api/v1/animals")
            .send(Animal)
            .end((req, res) => {
                chai.expect(res.status).to.be.equal(201);
                done();
            });
    
    });
    it("should verify Get All Status Code", (done) => {
        chai
            .request(app)
            .get("/api/v1/animals")
            .end((req, res) => {
                chai.expect(res.status).to.be.equal(200);
                done();
            });
    });
    it("should verify Get by ID Status Code", (done) => {
        chai
            .request(app)
            .get("/api/v1/animals/2")
            .end((req, res) => {
                chai.expect(res.status).to.be.equal(200);
                done();
            });
    });
    it("should verify Update Status Code", (done) => {
        chai
            .request(app)
            .put("/api/v1/animals/2")
            .send({
                deathDate: "2023-05-10T00:00:00.000Z",
            })
            .end((req, res) => {
                chai.expect(res.status).to.be.equal(200);
                done();
            });
    });
    it("should verify Delete Status Code", (done) => {
        chai
            .request(app)
            .delete("/api/v1/animals/2")
            .end((req, res) => {
                chai.expect(res.status).to.be.equal(200);
                done();
            });
    });

});
