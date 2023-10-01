import chai from "chai";
import chaiHttp from "chai-http";
import { describe, it } from "mocha";

import app from "../index.js";

chai.use(chaiHttp);


it("should get all routes", (done) => {
    chai
      .request(app)
      .get("/api/")
      .end((req, res) => {
        chai.expect(res.status).to.be.equal(200);
        chai.expect(res.text).to.be.be.include(
            "<h1>Available Routes:</h1>",
            "<ul><li><a href='/api/v1/zoos'>/api/v1/zoos</a></li>",
            "<li><a href='/api/v1/enclosures'>/api/v1/enclosures</a></li>",
            "<li><a href='/api/v1/animals'>/api/v1/animals</a></li>",
            "<li><a href='/api/v1/workers'>/api/v1/workers</a></li>",
            "<li><a href='/api/v1/visitors'>/api/v1/visitors</a></li>",
            "<li><a href='/api/v1/tourGroups'>/api/v1/tourGroups</a></li></ul>"
        )
        done();

      });
  });
