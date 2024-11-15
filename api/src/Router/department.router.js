const Router = require("express");
const router = new Router();
const department_controller = require("../Controller/department.controller");

router.get("/", (req, res) => {
  res.send("Welcome to the Departments API");
});

//Department
router.post("/departments", department_controller.createDepartments);
router.get("/departments", department_controller.getDepartments);
router.get("/departments/:id", department_controller.getOneDepartments);
router.put("/departments", department_controller.updateDepartments);
router.delete("/departments/:id", department_controller.deleteDepartments);

module.exports = router;
