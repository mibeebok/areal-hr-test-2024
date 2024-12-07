const Router = require("express");
const router = new Router();
const historyOfChangeController = require("../Controller/history-of-change.controller");

router.get("/", (req, res) => {
  res.send("Welcome to the History of change API");
});

router.get(
  "/history_of_change",
  historyOfChangeController.getHistoryOfChange
);
router.get(
  "/history_of_change/:id",
  historyOfChangeController.getOneHistoryOfChange
);

module.exports = router;
