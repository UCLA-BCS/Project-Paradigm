// var expect = require("chai").expect;

// describe("canary test", function() {
//   // A "canary" test is one we set up to always pass
//   // This can help us ensure our testing suite is set up correctly before writing real tests
//   it("should pass this canary test", function() {
//     expect(true).to.be.true;
//   });
// });


// 'use strict';
var chai = require('chai');
var chaiHttp = require('chai-http');
const { expect } = require('chai');

chai.use(chaiHttp);

describe('Inputting data into database', function() {
    var host = "http://localhost:3000";
    var path = "/users/add";

    it('Info is in database', function(done) {
        chai
            .request(host)
            .post(path)
            // .field('myparam' , 'test')
            // .set('content-type', 'application/x-www-form-urlencoded')
            .send({name: 'danver', password: "password", allergies: "nuts", dietaryRestrictions: "fish"})
            .then(function (res) {
              expect(res).to.have.status(200);
              done();
            })
            .catch(function (err) {
              throw err;
            });
    });
});