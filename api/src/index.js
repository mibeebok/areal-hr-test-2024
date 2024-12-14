const express = require("express");
const session = require('express-session');
const passport = require('passport');
const cors = require('cors');
const organization_router = require("./Router/organization.router");
const department_router = require("./Router/department.router");
const position_router = require("./Router/position.router");
const employees_router = require("./Router/employees.router");
const personnel_operations_router = require("./Router/personnel-operations.router");
const history_of_change_router = require("./Router/history-of-change.router");
const auth_router = require("./Router/auth.router")
const admin_user = require("./first-admin-user.controller")

const PORT = process.env.PORT || 8081;

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: `${process.env.SECRET_KEY}`,
    resave: false,
    saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());



app.get("/", (req, res) => {
  res.send("Welcome to the API");
});

app.use("/Auth", auth_router)
app.use("/Org", organization_router);
app.use("/Dep", department_router);
app.use("/Pos", position_router);
app.use("/Empl", employees_router);
app.use("/PerOP", personnel_operations_router);
app.use("/His", history_of_change_router);

async function init() {
  await admin_user.firstAdminUser();
  app.listen(PORT, "0.0.0.0", () =>
    console.log(`server started on post ${PORT}`)
  );
}
init();