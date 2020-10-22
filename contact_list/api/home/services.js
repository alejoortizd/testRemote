const Contacts = require("../../model/Contacts");

function renderHome(req, res, next) {
  res.render("index");
}

module.exports = {
  renderHome,
}
