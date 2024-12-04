const Router = require("express");
const router = new Router();
const avtorizaton_controller = require("../Controller/avtorization.controller");

router.get("/", (req, res) => {
    res.send("Welcome to the Avtorization API");
  });

  router.post("/login", avtorizaton_controller.login)

  module.exports = router;