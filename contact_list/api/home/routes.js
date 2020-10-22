const { Router } = require('express');
const router = Router();
const rutasIndex = require('./services')

router.get('/', rutasIndex.renderHome);


module.exports = router;
