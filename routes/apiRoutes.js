var db = require("../models");

module.exports = function (app) {
  //========================================================================================
  // USER RELATED FUNCTIONS
  //========================================================================================
  // Returns all users in database
  // Should this be used...?
  app.get("/users/all", function (req, res) {
    db.SiteUser.findAll({}).then(function (bestow_db) {
      res.json(bestow_db);
    });
  });

  // Deletes a user given the id
  app.delete("/users/delete/:userID", function (req, res) {
    var deleteUser = req.params.userID;

    db.SiteUser.destroy({
      where: {
        id: deleteUser,
      },
    })
      .then(function (bestow_db) {
        res.json(bestow_db);
      })
      .catch(function (err) {
        res.json(err);
      });
  });

  // Searches for all drinks associated with the user in question
  // Requires userID--not user name
  app.get("/users/drinks/:userID", function (req, res) {
    var queryUser = req.params.userID;

    db.SiteDrink.findAll({
      where: {
        owner: queryUser,
      },
    }).then(function (bestow_db) {
      res.json(bestow_db);
    });
  });

  // Deletes a drink given the id
  app.delete("/users/delete-drinks/:drinkID", function (req, res) {
    var deleteDrink = req.params.drinkID;

    db.SiteDrink.destroy({
      where: {
        id: deleteDrink,
      },
    })
      .then(function (bestow_db) {
        res.json(bestow_db);
      })
      .catch(function (err) {
        res.json(err);
      });
  });

  // Updates drink given the id
  app.put("/users/update-drinks/:drinkID", function (req, res) {
    var updateDrink = req.params.drinkID;

    db.SiteDrink.update(
      {
        coffeeShop: req.body.coffeeShop,
        isHot: req.body.isHot,
        drinkName: req.body.drinkName,
        specialInstructions: req.body.specialInstructions,
      },
      {
        where: {
          id: updateDrink,
        },
      }
    )
      .then(function (bestow_db) {
        res.json(bestow_db);
      })
      .catch(function (err) {
        res.json(err);
      });
  });

  // Adds drink with the userID given
  // DO NOT USE USER NAME (get drinks function searches by ID)
  app.post("/users/add-drinks/:userID", function (req, res) {
    var queryUser = req.params.userID;

    db.SiteDrink.create({
      owner: queryUser,
      coffeeShop: req.body.coffeeShop,
      isHot: req.body.isHot,
      drinkName: req.body.drinkName,
      specialInstructions: req.body.specialInstructions,
    })
      .then(function (bestow_db) {
        res.json(bestow_db);
      })
      .catch(function (err) {
        res.json(err);
      });
  });

  // Adds a new user to the database
  // Password should be hashed PRIOR TO SENDING (hence it is not hashed here)
  //     This is because the information is sent via post; hence, the password should be hashed before sending
  app.post("/users/add", function (req, res) {
    db.SiteUser.create({
      name: req.body.name,
      password: req.body.password,
      allergies: req.body.allergies,
      dietaryRestrictions: req.body.dietaryRestrictions,
    })
      .then(function (bestow_db) {
        res.json(bestow_db);
      })
      .catch(function (err) {
        res.json(err);
      });
  });
};
