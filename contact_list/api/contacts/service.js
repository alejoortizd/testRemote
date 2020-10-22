const Contacts = require("../../model/Contacts");

function renderForm(req, res) {
  res.render("contacts/new");
}

async function createNewContact(req, res) {
  const contact = new Contacts(req.body);
  contact.user = req.user._id;
  try {
    const nContact = await contact.save();
    if (nContact) {
      req.flash("success_msg", "Contact created");
      res.redirect("/contacts/new");
    }
  } catch (error) {
    console.log(error)
  }
}

async function renderContacts(req, res, next) {
  const userId = req.user.id;
  const { tags } = req.query;
  try {
    const contacts = await Contacts.find({ user: userId, tags }).lean();

    res.render("contacts/myContacts", { contacts });
  } catch (error) {
    next(error);
  }
}

async function renderEditForm(req, res) {
  const { contactId } = req.params;
  const contact = await Contacts.findOne({ _id: contactId }).lean();
  if (contact.user != req.user.id) {
    req.flash("error_msg", "Unauthorized");
    return res.redirect("/contacts");
  }
  res.render("contacts/edit-contact", { contact });
}

async function updateContact(req, res, next) {
  const { contactId } = req.params;
  const { body: contact } = req;

  try {
    await Contacts.updateOne({ _id: contactId }, { $set: contact });
    req.flash("success_msg", "contact updated");
    res.redirect("/contacts");
  } catch (error) {
    next(error);
  }
}

async function renderContact(req, res, next) {
  const { contactId } = req.params;
  try {
    const contact = await Contacts.findOne({ _id: contactId }).lean();
    res.render("contacts/ver-mas", { contact });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  renderForm,
  createNewContact,
  renderContacts,
  renderContact,
  renderEditForm,
  updateContact,
};
