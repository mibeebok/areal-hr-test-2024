const Router = require("express");
const router = new Router();
const specialistController = require("../Controller/specialist.controller");

router.get("/", (req, res) => {
  res.send("Welcome to the specialist API");
});

//Employees
router.post("/specialist", specialistController.createSpecialist);
router.get("/specialist", specialistController.getSpecialist);
router.put("/specialist/:id", specialistController.updateSpecialist);
router.get("/specialist/:id", specialistController.deleteSpecialist);

module.exports = router;
