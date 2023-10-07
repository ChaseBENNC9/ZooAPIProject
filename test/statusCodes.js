//Generic testing for status codes
import chai from "chai";
import chaiHttp from "chai-http";
import { describe, it } from "mocha";

import app from "../index.js";

chai.use(chaiHttp);

const testStatusGetAll = (route) => {
    it(`should respond with status: 200 for ${route}`, (done) => {
        chai
            .request(app)
            .get(`/api/v1/${route}`)
            .end((req, res) => {
                chai.expect(res.status).to.be.equal(200);
                done();
            });
    });
}

const testStatusCreate = (route,data) => {
    it(`should respond with status: 201 for ${route}`, (done) => {
        chai
            .request(app)
            .post(`/api/v1/${route}`)
            .send(data)
            .end((req, res) => {
                chai.expect(res.status).to.be.equal(201);

                done();
            });
    });
}

const testStatusGetOne = (route) => {
    it(`should respond with status: 200 for ${route}`, (done) => {
        chai
            .request(app)
            .get(`/api/v1/${route}/2`)
            .end((req, res) => {
                chai.expect(res.status).to.be.equal(200);
                done();
            });
    });
}

const testStatusUpdate = (route,data,id) => {
    it(`should respond with status: 200 for ${route}`, (done) => {
        chai
            .request(app)
            .put(`/api/v1/${route}/2`)
            .send(data)
            .end((req, res) => {
                chai.expect(res.status).to.be.equal(200);
                done();
            });
    });
}

const testStatusDelete = (route) => {
    it(`should respond with status: 200 for ${route}`, (done) => {
        chai
            .request(app)
            .delete(`/api/v1/${route}/2`)
            .end((req, res) => {
                chai.expect(res.status).to.be.equal(200);
                done();
            });
    });
}

export {testStatusCreate, testStatusGetAll, testStatusGetOne, testStatusUpdate, testStatusDelete}