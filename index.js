const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT  || 5000;



const route = require('./route/route');
route.router(app);
app.listen(port, function () {
    console.log('App listening on port: ' + port);
});