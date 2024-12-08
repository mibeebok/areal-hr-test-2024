const express = require("express");
const organization_router = require("./Router/organization.router");
const department_router = require("./Router/department.router");
const position_router = require("./Router/position.router");
const employees_router = require("./Router/employees.router");
const personnel_operations_router = require("./Router/personnel-operations.router");
const history_of_change_router = require("./Router/history-of-change.router");
const {UserService} = require ("./User/user.service");
const user_router = require ("./Router/specialist.router");

const PORT = process.env.PORT || 8081;

const app = express();

app.use(express.json());

const userService = new UserService();

async function initializeAdmin() {
    try {
        await userService.initializeAdminUser ();
        console.log('Admin user initialization complete.');
    } catch (error) {
        console.error('Error initializing admin user:', error);
    }
}


initializeAdmin();

app.get("/", (req, res) => {
  res.send("Welcome to the API");
});

app.use("/Org", organization_router);
app.use("/Dep", department_router);
app.use("/Pos", position_router);
app.use("/Empl", employees_router);
app.use("/PerOP", personnel_operations_router);
app.use("/His", history_of_change_router);
app.use("/User", user_router);

app.listen(PORT, "0.0.0.0", () =>
  console.log(`server started on post ${PORT}`)
);
