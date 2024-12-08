const express = require ('express');
const router = express.Router();
const authenticateController = require('../User/authentication.controller');

router.get("/", (req, res) => {
    res.send("Welcome to the Authentication API");
  });

  router.post("/auth", authenticateController.autenticateUser)

  module.exports = router;