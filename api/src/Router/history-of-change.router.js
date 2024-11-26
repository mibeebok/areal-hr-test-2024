const Router = require("express");
const router = new Router();
const history_of_change_controller = require("../Controller/history-of-change.controller");

router.get("/", (req, res) => {
  res.send("Welcome to the History of change API");
});

//History of change
/*router.post(
  "/history_of_change",
  history_of_change_controller.createHistoryOfChange
);*/
router.get(
  "/history_of_change",
  history_of_change_controller.getHistoryOfChange
);
router.get(
  "/history_of_change/:id",
  history_of_change_controller.getOneHistoryOfChange
);
/*router.put(
  "/history_of_change",
  history_of_change_controller.updateHistoryOfChange
);
router.delete(
  "/history_of_change/:id",
  history_of_change_controller.deleteHistoryOfChange
);*/

module.exports = router;
