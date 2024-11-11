const express = require('express')
const organization_router = require('./Router/organization.router')
const department_router = require('./Router/department.router')
const position_router = require('./Router/position.router')
const employees_router = require('./Router/employees.router')
const files_router = require('./Router/files.router')
const personnel_operations_router = require('./Router/personnel_operations.router')
const history_of_change_router = require('./Router/history_of_change.router')

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