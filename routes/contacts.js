var express = require('express');
var router = express.Router();
const contactsController = require('../controllers/contactController');
const contactsRepo = require('../src/contactsFileRepository');
const { body } = require('express-validator');
// , validationResult 

// let data = [
//   {name: "karan", id: "ddad031e-e030-419a-9518-2f16534edeaf"},
//   {id: "e4a9c8f6-4bb8-44f5-8915-8df78500f6e3", name: "vawn", lname: "patel", email: "vawnpatel@gmail.com", notes: "this is example contact", date: 1676952665922 }
// ]


/* GET Contacts Database. */
router.get('/', contactsController.contacts_list);

/* GET Create Contact Form */
router.get('/add', contactsController.contacts_create_get);
/* POST Create Contact  */
router.post('/add', 
  // console.log(req.body);
  // body('firstName').trim().notEmpty(),
  contactsController.contacts_create_post);

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
