const express = require("express");
const router = express.Router();
const passport = require("passport");

//Login
router.post(
  "/login",
  passport.authenticate("login", {
    failureRedirect: "/auth/login?error=true",
  }),
  async (req, res) => {
    try {
      const user = req.user;
      if (!user) {
        return res.status(400).send({ status: "error" });
      } else {
        req.session.user = {
          first_name: req.user.first_name,
          last_name: req.user.last_name,
          age: req.user.age,
          email: req.user.email,
          rol: req.user.rol,
        };
        req.session.login = true;
        res.redirect("/api/products/view");
      }
    } catch (error) {
      res.status(400).send({ error: "Error en el login" });
    }
  }
);

router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] }),
  async (req, res) => {}
);

router.get(
  "/githubcallback",
  passport.authenticate("github", {
    failureRedirect: "/auth/login?error=true",
  }),
  async (req, res) => {
    req.session.user = req.user;
    req.session.login = true;
    res.redirect("/api/products/view");
  }
);

//Logout
router.get("/logout", (req, res) => {
  if (req.session.login) {
    req.session.destroy();
  }
  res.redirect("/auth/login");
});

module.exports = router;
