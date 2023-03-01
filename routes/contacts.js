var express = require('express');
var router = express.Router();
const contactsController = require('../controllers/contactController');
const { body } = require('express-validator');


/* GET Contacts Database. */
router.get('/', contactsController.contacts_list);

/* GET Create Contact Form */
router.get('/add', contactsController.contacts_create_get);
/* POST Create Contact  */
router.post('/add', contactsController.contacts_create_post);

/* GET Single Contact */ 
router.get('/:uuid', contactsController.contacts_detail);

/* GET Delete Contact */
router.get('/:uuid/delete', contactsController.contacts_delete_get);

/* POST Delete Contact */
router.post('/:uuid/delete', contactsController.contacts_delete_post);

/* GET Edit Contact */
router.get('/:uuid/edit', contactsController.contacts_edit_get);

/* POST Edit Contact  */
router.post('/:uuid/edit', contactsController.contact_edit_post);

module.exports = router;
