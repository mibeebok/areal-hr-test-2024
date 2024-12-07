const Router = require("express");
const router = new Router();
const employeesController = require("../Controller/employees.controller");

router.get("/", (req, res) => {
  res.send("Welcome to the Employees API");
});

//Employees
router.post("/employees", employeesController.createEmployees);
router.get("/employees", employeesController.getEmployees);
router.get("/employees/:id", employeesController.getOneEmployees);
router.put("/employees/:id", employeesController.updateEmployees);
router.get("/employees/:id", employeesController.deleteEmployees);

module.exports = router;
