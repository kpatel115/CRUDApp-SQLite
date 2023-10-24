var express = require('express');
var router = express.Router();
const contactsRepo = require('../src/contactsSQLiteRepository');
const { validationResult } = require('express-validator');
const Contact = require('../src/Contact');


/* GET Contacts listing */
exports.contacts_list = function(req, res, next) {
  const data = contactsRepo.findAll()
  res.render('contacts', { title: 'Express Contacts', contacts: data});
};

/* GET Create Contact Form */
exports.contacts_create_get = function(req, res, next) {
  res.render('contacts_add', { title: 'Add An Express Contact' });
};
/* POST Create Contact  */
exports.contacts_create_post = function(req, res, next) {
  const result = validationResult(req);
  if(!result.isEmpty()) {
    res.render('contacts_add', { title: "Add a Contact", msg: result.array()});
  } else {
    const newContact = new Contact('', req.body.name, req.body.lname, req.body.email, req.body.notes, ''); //req.body.time
    contactsRepo.create(newContact)
    // add contact to database
    // contactsRepo.create({name: req.body.firstName.trim(), lname: req.body.lastName.trim(), email:req.body.email.trim(), notes: req.body.notes.trim()})
    res.redirect('/contacts');
  }
  
};

/* GET Single Contact */ 
exports.contacts_detail = function(req, res, next) {
  const contact = contactsRepo.findById(req.params.uuid);
  if (contact) {
    res.render('contact', { title: 'Your Contact', contact: contact });
  } else {
    res.redirect('/contacts');
  }
  
};

/* GET Delete Contact */
exports.contacts_delete_get = function(req, res, next) {
  const contact = contactsRepo.findById(req.params.uuid);
  res.render('contacts_delete', { title: 'Delete An Express Contact', contact: contact });
};

/* POST Delete Contact */
exports.contacts_delete_post = function(req, res, next) {
  //delete from repo
  contactsRepo.deleteById(req.params.uuid);
  res.redirect('/contacts')
};

/* GET Edit Contact */
exports.contacts_edit_get = function(req, res, next) {
  const contact = contactsRepo.findById(req.params.uuid);
  res.render('contacts_edit', { title: 'Edit An Express Contact', contact: contact });
};

/* POST Edit Contact  */
exports.contact_edit_post = function(req, res, next) {
  if (req.body.firstName.trim() === "") {
    const contact = contactsRepo.findById(req.params.uuid);
    res.render('contacts_edit', { title: "Edit a Contact", msg: 'Please fill out the form', contact: contact });
  } else {
    // update Database
    const updatedContact = new Contact (req.params.uuid, req.body.name, req.body.lname, req.body.email, req.body.notes, req.params.time );
    contactsRepo.update(updatedContact);
    res.redirect(`/contacts/${req.params.uuid}`);
  }
  
};