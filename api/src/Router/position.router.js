const Router = require("express");
const router = new Router();
const positionController = require("../Controller/position.controller");

router.get("/", (req, res) => {
  res.send("Welcome to the Positions API");
});

//Position
router.post("/positions", positionController.createPositions);
router.get("/positions", positionController.getPositions);
router.get("/positions/:id", positionController.getOnePositions);
router.put("/positions/:id", positionController.updatePositions);
router.get("/positions/:id", positionController.deletePositions);

module.exports = router;
