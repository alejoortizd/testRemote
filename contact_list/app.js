const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
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
app.set('views', path.join(__dirname, 'views'))
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}));
app.set('view engine', '.hbs');


// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// Routes


app.use(slash());


// Static files
app.use(express.static(path.join(__dirname, 'public')));


module.exports = app
