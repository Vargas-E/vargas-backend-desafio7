const express = require("express");
const router = express.Router();

router.use(express.static("./src/public"));

// Ruta para el formulario de login
router.get("/login", (req, res) => {
  const error = req.query.error;
  if (req.session.login) {
    return res.redirect("/api/products/view");
  }
  if (error != undefined) {
    res.render("login", {error: true});
  } else {
    res.render("login");
  }
});

// Ruta para el formulario de registro
router.get("/register", (req, res) => {
  const error = req.query.error;

  if (req.session.login) {
    return res.redirect("/api/products/view");
  }
  if (error != undefined) {
    res.render("register", {error: true});
  } else {
    res.render("register");
  }
});

module.exports = router;
