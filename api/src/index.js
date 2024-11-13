const express = require('express')
const organization_router = require('./src/Router/organization.router')
const department_router = require('./src/Router/department.router')
const position_router = require('./src/Router/position.router')
const employees_router = require('./src/Router/employees.router')
const files_router = require('./src/Router/files.router')
const personnel_operations_router = require('./src/Router/personnel_operations.router')
const history_of_change_router = require('./src/Router/history_of_change.router')

const PORT = process.env.PORT || 8081

const app = express()

app.use(express.json())
app.use ('/Org', organization_router)
app.use ('/Dep', department_router)
app.use ('/Pos', position_router)
app.use ('/Empl', employees_router)
app.use ('/Fil', files_router)
app.use ('/PerOP', personnel_operations_router)
app.use ('/His', history_of_change_router)

app.listen (PORT, () => console.log (`server started on post ${PORT}`))