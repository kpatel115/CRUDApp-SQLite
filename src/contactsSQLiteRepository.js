// Memory Repository
// handling all data access
const crypto = require('crypto');
const betterSqlite3 = require('better-sqlite3');
const fs = require('fs');
const path = require('path');
const Contact = require('./contact');
const { create } = require('domain');

const db = new betterSqlite3(path.join(__dirname, '../data/contacts.sqlite'), {verbose: console.log});

const createStmt = db.prepare("CREATE TABLE IF NOT EXISTS contacts (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, lname TEXT NOT NULL, email BLOB, notes TEXT, time TIMESTAMP DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL)"); //lname TEXT, email TEXT, notes TEXT,
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
    const stmt = db.prepare("SELECT * FROM contacts");
    const rows = stmt.all();
    let contacts = [];
    rows.forEach((row) => {
      const aContact = new Contact(row.id, row.name, row.lname, row.email, row.notes, row.time); 
      contacts.push(aContact);
    });
    return contacts;
  },
  findById: (uuid) => {
    const stmt = db.prepare("SELECT * FROM contacts WHERE id = ?");
    const row = stmt.get(uuid);
    return new Contact(row.id, row.name, row.lname, row.email, row.notes, row.time) 
  },
  create: (contact) => {
      const stmt = db.prepare("INSERT INTO contacts (name, lname, email, notes) VALUES (?, ?, ?, ?)");// ? ? ?
      const info = stmt.run(contact.name, contact.lname, contact.email, contact.notes);
      console.log(`contact created with id: ${info.lastInsertRowid}`);
    },
  deleteById: (uuid) =>{
    const stmt = db.prepare("DELETE FROM contacts WHERE id = ?");
    const info = stmt.run(uuid);
    console.log(`rows affected: ${info.changes}`);
  },
  update: (contact) => {
    const stmt = db.prepare("UPDATE contacts SET name = ?, lname = ?, email = ?, notes = ? WHERE id = ? ");
    const info = stmt.run(contact.name, contact.lname, contact.email, contact.notes, contact.id, );
    console.log(`rows affected: ${info.changes}`);
  },
};

module.exports = repo;

