const express = require("express");
const router = express.Router();
const passport = require("passport");

// Register
router.post(
  "/",
  passport.authenticate("register", {
    failureRedirect: "/auth/register?error=true",
  }),
  async (req, res) => {
    console.log("entre acaa");
    const { first_name, last_name, email, password, age } = req.body;
    try {
      if (!req.user)
        return res.status(400).send({ error: "El email ya esta registrado" });
      req.session.user = {
        first_name: first_name,
        last_name: last_name,
        age: age,
        email: email,
        rol: "user"
      };
      req.session.login = true;
      res.redirect("/api/products/view");
    } catch (error) {
      console.log("Error al crear el usuario:", error);
      res.status(500).send({ error: "Error al guardar el usuario nuevo" });
    }
  }
);

module.exports = router;
