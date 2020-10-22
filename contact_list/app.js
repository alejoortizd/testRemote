const express = require("express");
const exphbs = require("express-handlebars");
const path = require("path");
const flash = require("connect-flash");
const session = require("express-session");
const passport = require("passport");
const cors = require("cors");
const slash = require("express-slash");

// Controllers
const homeRouter = require("./api/home/routes");
const userRouter = require("./api/user/routes");
const contactRouter = require("./api/contacts/routes");

// Initialization
const app = express();
app.use(session({ secret: "config.secret" }));
require("./config/passport");

// Settings
app.set("port", 3000);
app.set("views", path.join(__dirname, "views"));
app.engine(
  ".hbs",
  exphbs({
    defaultLayout: "main",
    layoutsDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"),
    extname: ".hbs",
  })
);
app.set("view engine", ".hbs");
app.use(
  session({
    secret: "config.secret",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/", homeRouter);
app.use("/", userRouter);
app.use("/", contactRouter);

app.use(slash());

// Global Variables
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  res.locals.user = req.user || null;
  next();
});

// Static files
app.use(express.static(path.join(__dirname, "public")));

module.exports = app;
