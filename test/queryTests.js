
//Generic testing for status codes
import chai from "chai";
import chaiHttp from "chai-http";
import { describe, it } from "mocha";

import app from "../index.js";

chai.use(chaiHttp);
const testSorting = (route) => {
    it(`should sort ${route} descending by ID`, (done) => {
        chai
            .request(app)
            .get(`/api/v1/${route}?sortBy=id&sortOrder=desc`)
            .end((req, res) => {
                chai.expect(res.body.data).to.be.a("array");
                console.log(res.body.msg);
                chai.expect(res.body.data[0].id).to.be.greaterThan(res.body.data[1].id);
                done();
            });
    });
}

    const testPagination = (route,count) => {
        it(`Should return ${count} ${route}`, (done) => {
            chai
                .request(app)
                .get(`/api/v1/${route}?count=${count}`)
                .end((req, res) => {
                    chai.expect(res.body.data).to.be.a("array");
                    chai.expect(res.body.data.length).to.be.equal(count);
                    done();
                });
        });
    }
    const testFiltering = (route,field,value) => {
        it(`Should return ${route} where ${field} is ${value}`, (done) => {
            chai
                .request(app)
                .get(`/api/v1/${route}?${field}=${value}`)
                .end((req, res) => {
                    chai.expect(res.body.data).to.be.a("array");
                    chai.expect(res.body.data[0][field]).to.be.equal(value);
                    done();
                });
        });
    }

    export { testSorting, testPagination, testFiltering };