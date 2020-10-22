const { Router } = require('express');
const router = Router();
const contactsRoutes = require('./service');
const isAuth = require('../../utils/auth');

router.get('/contacts/contact/create', isAuth.isAuthenticated, contactsRoutes.renderForm);
router.post('/contacts/new', isAuth.isAuthenticated, contactsRoutes.createNewContact);
router.get('/contacts', isAuth.isAuthenticated, contactsRoutes.renderContacts);
router.get('/contacts/edit/:contactId', isAuth.isAuthenticated, contactsRoutes.renderEditForm);
router.put('/contacts/edit/:contactId', isAuth.isAuthenticated, contactsRoutes.updateContact);
router.get('/contact/:contactId', contactsRoutes.renderContact);

module.exports = router;
