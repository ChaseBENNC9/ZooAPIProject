import chai from "chai";
import chaiHttp from "chai-http";
import { describe, it } from "mocha";
import { testStatusCreate, testStatusGetAll, testStatusGetOne, testStatusUpdate, testStatusDelete } from "./statusCodesTests.js";

import app from "../index.js";
import { testFiltering, testPagination, testSorting } from "./queryTests.js";
chai.use(chaiHttp);

const Animal = {
    enclosureId: 1,
    name: "Larry2",
    species: "Lion",
    sex: "MALE",
    birthDate: "2019-01-01T00:00:00.000Z",
};


describe("Animals", () => {

    testSorting("animals");

testFiltering("animals", "species", "Orca");
    testPagination("animals", 12);




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

    //Status Codes
    testStatusCreate("animals", {
        enclosureId: 3,
        name: "LarryBarry",
        species: "Lion",
        sex: "MALE",
        birthDate: "2019-01-01T00:00:00.000Z",
    }
    );
    testStatusGetAll("animals");
    testStatusGetOne("animals");
    testStatusUpdate("animals", {
        deathDate: "2023-05-10T00:00:00.000Z",
    });
    testStatusDelete("animals");




});
