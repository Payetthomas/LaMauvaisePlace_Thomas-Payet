const express = require('express');
const app = express();
const port = 3000;
const initRoutes = require('./routes');

app.use(express.json());

initRoutes(app);

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})
