const express = require('express');
const app = express();
var path = require('path');


var bodyParser = require("body-parser");

app.set('views', path.join(__dirname,'views'));
app.set('view engine','ejs');
app.use(express.static(path.join(__dirname, '/public')));
/* @@END VIEWS ENGINE */

/* BODY_PARSER */
app.use(bodyParser.json({limit: '50mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '60mb', extended: true}))
/* END @@BODY_PARSER */


require('dotenv').config();
const port = process.env.PORT  || 5000;


app.set('views', path.join(__dirname,'views'));
app.set('view engine','ejs');
app.use(express.static(path.join(__dirname, '/public')));


const route = require('./route/route');
route.router(app);
app.listen(port, function () {
    console.log('App listening on port: ' + port);
});