const Router = require("express");
const router = new Router();
const avtorizatonController = require("../User/avtorization.controller");

router.get("/", (req, res) => {
    res.send("Welcome to the Avtorization API");
  });

  router.post("/login", avtorizatonController.login)

  module.exports = router;