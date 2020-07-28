// chai-http for get post requests
var chai = require('chai');
var chaiHttp = require('chai-http');
const { expect } = require('chai');

// setting up chai http plugin
chai.use(chaiHttp);

// siteUsers
// describe('Inputting x3 users into database', function() {
//     var host = "http://localhost:3000";
//     var path = "/users/add";

//     it('Users have been added to database', function(done) {
//         chai
//             .request(host)
//             // will be creating a post request
//             .post(path)
//             // .send is json information for the post request
//             .send({name: 'danver', password: "password", allergies: "nuts", dietaryRestrictions: "fish"})
//             .send({name: 'datroit', password: "wordpass", allergies: "lactose", dietaryRestrictions: "meat"})
//             .send({name: 'daver', password: "passingword", allergies: "msg", dietaryRestrictions: "gluten"})
//             .then(function (res) {
//               expect(res).to.have.status(200);
//               done();
//             })
//             .catch(function (err) {
//               throw err;
//             });
//     });
// });

// siteDrinks
describe('Inputting x3 drinks into database', function() {
  var host = "http://localhost:3000";
  var path = "/users/add-drinks/:userID";

  it('Drinks have been added to database', function(done) {
      chai
          .request(host)
          // will be creating a post request
          .post(path)
          // .send is json information for the post request
          .send({owner: 1, coffeeShop: "Starbucks", isHot: true, drinkName: "Hot Mocha Chai Latte", specialInstructions: "no nuts, extra whipped cream"})
          
          .then(function (res) {
            expect(res).to.have.status(200);
            done();
          })
          .catch(function (err) {
            throw err;
          });
  });
});


// describe('Inputting data into database', function() {
//   var host = "http://localhost:3000";
//   var path = "/users/add-drinks/:userID";

//   it('Info is in database', function(done) {
//       chai
//           .request(host)
//           .post(path)
//           // .field('myparam' , 'test')
//           // .set('content-type', 'application/x-www-form-urlencoded')
//           .send({name: 'danver', password: "password", allergies: "nuts", dietaryRestrictions: "fish"})
//           .then(function (res) {
//             expect(res).to.have.status(200);
//             done();
//           })
//           .catch(function (err) {
//             throw err;
//           });
//   });
// });

