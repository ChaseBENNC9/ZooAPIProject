/**
 * @file this file contains generic tests that can be imported for each route, it tests the queries for sorting, filtering, and pagination
 * @author Chase Bennett-Hill
 */
import chai from "chai";
import chaiHttp from "chai-http";
import { describe, it } from "mocha";

import app from "../index.js";

chai.use(chaiHttp);
/**
 * @description this function tests the sorting query for a given route by sorting descending by ID
 * @param {string} route 
 */
const testSorting = (route) => {
    it(`should sort ${route} descending by ID`, (done) => {
        chai
            .request(app)
            .get(`/api/v1/${route}?sortBy=id&sortOrder=desc`)
            .end((req, res) => {
                chai.expect(res.body.data).to.be.a("array");
                console.log(res.body.msg);
                chai.expect(res.body.data[0].id).to.be.greaterThan(res.body.data[1].id); //Asserts that the first ID is greater than the second ID which means it is sorted descending
                done();
            });
    });
}
/**
 * @description this function tests the pagination query for a given route by returning a specified number of results
 * @param {string} route
 * @param {number} count
 */
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
    /**
     * 
     * @param {string} route 
     * @param {string} field 
     * @param {*} value 
     */
    const testFiltering = (route,field,value) => {
        it(`Should return ${route} where ${field} is ${value}`, (done) => {
            chai
                .request(app)
                .get(`/api/v1/${route}?${field}=${value}`)
                .end((req, res) => {
                    chai.expect(res.body.data).to.be.a("array");
                    chai.expect(res.body.data[0][field]).to.be.equal(value); //Asserts that the first result has the specified value for the specified field
                    done();
                });
        });
    }

    export { testSorting, testPagination, testFiltering };