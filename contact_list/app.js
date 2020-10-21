const express = require('express');
const exphbs = require('express-handlebars');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const cors = require("cors");
const slash = require('express-slash');


// Controllers



// Initialization
const app = express();


// Settings
app.set('port', 3000);


// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// Routes


app.use(slash());


module.exports = app
