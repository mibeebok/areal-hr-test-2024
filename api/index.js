const express = require('express');
const OrganizationRouter = require ('./routes/organization.routes')
const PORT = process.env.PORT || 8081;

const app = express();

app.use(express.json)
app.use('/api', organizationRouter)

app.listen (PORT, () => console.log(`service started on post ${PORT}`));