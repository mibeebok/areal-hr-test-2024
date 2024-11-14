const Router = require("express");
const router = new Router();
const position_controller = require("../Controller/position.controller");

router.get("/", (req, res) => {
  res.send("Welcome to the Positions API");
});

//Position
router.post("/positions", position_controller.createPositions);
router.get("/positions", position_controller.getPositions);
router.get("/positions/:id", position_controller.getOnePositions);
router.put("/positions", position_controller.updatePositions);
router.delete("/positions/:id", position_controller.deletePositions);

module.exports = router;
