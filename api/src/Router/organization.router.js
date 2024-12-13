const Router = require("express");
const router = new Router();
const organizationController = require("../Controller/organization.controller.js");


router.get("/", (req, res) => {
  res.send("Welcome to the Organizations API");
});

//Organization
router.post("/organization", organizationController.createOrganization);
router.get("/organization", organizationController.getOrganization);
router.get("/organization/:id", organizationController.getOneOrganization);
router.put("/organization/:id", organizationController.updateOrganization);
router.delete("/organization/:id", organizationController.deleteOrganization);

module.exports = router;
