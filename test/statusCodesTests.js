/**
 * @file this File manages the testing for the status codes of the API routes, it is imported into the relevant test files and used to test the status codes of the routes
 * @author Chase Bennett-Hill
 */
import chai from "chai";
import chaiHttp from "chai-http";
import { describe, it } from "mocha";

import app from "../index.js";

chai.use(chaiHttp);
/**
 * @description This function tests the status code of a Get Request to a route
 * @param {string} route
 */
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
};

/**
 * @description This function tests the status code of a Post Request to a route
 * @param {string} route
 * @param {object} data
 */
const testStatusCreate = (route, data) => {
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
};
/**
 * @description This function tests the status code of a Get Request to a route for a single object
 * @param {string} route
 */
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
};
/**
 * @description This function tests the status code of a Put Request to a route
 * @param {string} route
 * @param {object} data
 */
const testStatusUpdate = (route, data, id) => {
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
};
/**
 * @description This function tests the status code of a Delete Request to a route
 * @param {string} route
 * @param {object} data
 */
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
};

export {
  testStatusCreate,
  testStatusGetAll,
  testStatusGetOne,
  testStatusUpdate,
  testStatusDelete,
};
