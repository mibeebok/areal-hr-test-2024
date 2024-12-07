const Router = require("express");
const router = new Router();
const departmentController = require("../Controller/department.controller");

router.get("/", (req, res) => {
  res.send("Welcome to the Departments API");
});

//Department
router.post("/departments", departmentController.createDepartments);
router.get("/departments", departmentController.getDepartments);
router.get("/departments/:id", departmentController.getOneDepartments);
router.put("/departments/:id", departmentController.updateDepartments);
router.get("/departments/:id", departmentController.deleteDepartments);

module.exports = router;
