const db = require("../models");
const argon2 = require("argon2");
const path = require("path");

module.exports = function(app) {
  const redirectLogin = (req, res, next) => {
    if (!req.session.userId) {
      res.redirect("/");
    } else {
      next();
    }
  };

  const redirectDashboard = (req, res, next) => {
    if (req.session.userId) {
      res.redirect("/dashboard");
    } else {
      next();
    }
  };

  app.get("/", (req, res) => {
    console.log(req.session);

    res.sendFile(path.join(__dirname, "../public/splash.html"));
  });

  app.get("/dashboard", redirectLogin, (req, res) => {
    console.log(req.session);
    res.sendFile(path.join(__dirname, "../public/dashboard.html"));
  });

  app.get("/signup", redirectDashboard, (req, res) => {
    console.log(req.session);
    res.sendFile(path.join(__dirname, "../public/signup.html"));
  });

  // ===============================[POST ROUTES]===========>

  // Takes the user's username and password;
  // checks them against the values in the database
  // If valid, it sends them to the dashboard
  // If not, it sends them to the signup page
  //
  // NEED TO ADD FUNCTION THAT SHOWS THE USER
  // THEIR INPUT WAS INVALID
  app.post("/login", redirectDashboard, async (req, res) => {
    const { username, password } = req.body;

    console.log(req.body);

    await db.SiteUser.findAll({
      where: {
        name: username,
      },
    })
      .then(async function(bestow_db) {
        var searchSet = bestow_db[0].dataValues;
        const { password: hashword } = searchSet;

        const valid = await argon2.verify(hashword, password);

        if (valid) {
          req.session.userId = searchSet.id;
          res.redirect("/dashboard");
        } else {
          res.redirect("/signup");
        }
      })
      .catch(function(err) {
        console.log(err);
        res.redirect("/signup");
      });
  });

  // Takes the information given by the user and creates a new account
  // It then redirects the user to the dashboard
  app.post("/register", redirectDashboard, async (req, res) => {
    const { username, password } = req.body;

    const hashword = await argon2.hash(password);

    await db.SiteUser.create({
      name: username,
      password: hashword,
    })
      .then(function(bestow_db) {
        console.log(bestow_db);
        req.session.userId = bestow_db.id;
        res.redirect("/dashboard");
      })
      .catch(function(err) {
        res.json(err);
      });
    /* Still needs to 
    (1) check if username taken
    (2) needs to ensure the password is confirmed*/
  });

  // Logs the user out (clears the session) and redirects them to the entry page
  app.post("/logout", redirectLogin, (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.redirect("/");
      }
      res.clearCookie("sid");
      res.redirect("/");
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
