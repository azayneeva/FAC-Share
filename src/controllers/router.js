const express = require('express');
const router = express.Router();

const home = require('./home');
const search = require('./search');
const addresources = require('./addresources');
const ifinputempty = require('./ifinputempty');
const urlvalidation = require('./urlvalidation');
const addresourcesext = require('./addresourcesext');
const error = require('./error');

router.get('/', home);
router.get('/search', search);
router.post('/add-resource-ext', addresourcesext, ifinputempty, addresources);
router.post('/add-resource', ifinputempty, urlvalidation, addresources);

router.use(error.client);
router.use(error.server);

module.exports = router;
