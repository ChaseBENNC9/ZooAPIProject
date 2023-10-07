/**
 * @file This file manages the testing for the Index route and an Invalid Route
 * @author Chase Bennett-Hill
 */

import chai from "chai";
import chaiHttp from "chai-http";
import { describe, it } from "mocha";

import app from "../index.js";

chai.use(chaiHttp);
describe("Route Testing", () => {
  it("should get all routes", (done) => {
    chai
      .request(app)
      .get("/api/")
      .end((req, res) => {
        chai.expect(res.status).to.be.equal(200); //this test sends a request to the index route and expects a 200 status code and a list of available routes
        chai
          .expect(res.text)
          .to.be.be.include(
            "<h1>Available Routes:</h1>",
            "<ul><li><a href='/api/v1/zoos'>/api/v1/zoos</a></li>",
            "<li><a href='/api/v1/enclosures'>/api/v1/enclosures</a></li>",
            "<li><a href='/api/v1/animals'>/api/v1/animals</a></li>",
            "<li><a href='/api/v1/workers'>/api/v1/workers</a></li>",
            "<li><a href='/api/v1/visitors'>/api/v1/visitors</a></li>",
            "<li><a href='/api/v1/tourGroups'>/api/v1/tourGroups</a></li></ul>",
          );
        done();
      });
  });
  it("Should return message for invalid routes", (done) => { //this test sends a request to an invalid route and expects a 404 error and a relevant message
    chai
      .request(app)
      .get("/api/v1/zoos/1/invalid")
      .end((req, res) => {
        chai.expect(res.status).to.be.equal(404);
        chai
          .expect(res.text)
          .to.be.equal("Error: This Endpoint is not available");
        done();
      });
  });
});
