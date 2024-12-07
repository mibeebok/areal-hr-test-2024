const Router = require("express");
const router = new Router();
const personnelOperationsController = require("../Controller/personnel-operations.controller");

router.get("/", (req, res) => {
  res.send("Welcome to the Personnel operations API");
});

//Personnel operations
router.post(
  "/personnel_operations",
  personnelOperationsController.createPersonnelOperations
);
router.get(
  "/personnel_operations",
  personnelOperationsController.getPersonnelOperations
);
router.get(
  "/personnel_operations/:id",
  personnelOperationsController.getOnePersonnelOperations
);
router.put(
  "/personnel_operations/:id",
  personnelOperationsController.updatePersonnelOperations
);
router.get(
  "/personnel_operations/:id",
  personnelOperationsController.deletePersonnelOperations
);
router.patch(
  "/personnel_operations/:id",
  personnelOperationsController.softDeleteEmployees
);

module.exports = router;
