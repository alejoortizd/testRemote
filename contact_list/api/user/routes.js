const {Router} = require('express');
const router = Router();
const user = require('./services');


router.get('/contact/create', user.renderSignUpForm);
router.post('/contact/create', user.singup);
router.get('/login', user.renderSingInForm);
router.post('/login', user.signin);
router.get('/logout', user.logout)


module.exports = router;
