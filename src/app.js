const express = require('express');
const app = express();
const initRoutes = require('./routes');
require('dotenv').config();
const port = process.env.PORT;

app.use(express.json());

initRoutes(app);

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})
