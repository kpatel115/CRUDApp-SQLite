// Memory Repository
// handling all data access
const crypto = require('crypto');
const betterSqlite3 = require('better-sqlite3');
const fs = require('fs');
const path = require('path');
const contact = require('./contact');
const { create } = require('domain');

const db = new betterSqlite3(path.join(__dirname, '../data/contacts.sqlite'), {verbose: console.log});

const createStmt = db.prepare("CREATE TABLE IF NOT EXISTS contacts (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, lname TEXT, email BLOB, notes TEXT, time INTEGER");
createStmt.run();

// const loadData = () => {
//   const jsonData = fs.readFileSync(path.join(__dirname, '../data/contacts.json'));
//   const contactsArray = JSON.parse(jsonData);
//   contactsArray.forEach(element => {
//     db.set(element[0], element[1]);
//   })   
// };
// const saveData = () => {
//   const stringifyData = JSON.stringify(Array.from(db));
//   fs.writeFileSync(path.join(__dirname, '../data/contacts.json'), stringifyData);
// };

// repo set to object for application
const repo = {
  findAll: () => {
    return [];
  },
  findById: (uuid) => {
    return {}
  },
  create: (contact) => {
      // contact.id = crypto.randomUUID();
      // db.set(contact.id, newContact);
      // saveData();
      // name: contact.name,
      // lname: contact.lname,
      // email: contact.email,
      // notes: contact.notes,
      // time: Date.now()
    },
  deleteById: (uuid) =>{
  //  db.delete(uuid);
  //  saveData();
  },
  update: (contact) => {
    // db.set(contact.id, contact);
    // saveData();
  },
};

module.exports = repo;

