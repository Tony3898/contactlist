let contactList = require('../data/data')  // getting sample data

// Can be updated with db for real application, how? check this https://github.com/Tony3898/nodejs-todo/blob/main/src/apis/todos.js
class Contact {

  getAllContacts(options) {
    return contactList
  }

  getViewContact(options) {
    if (!options.peopleId)
       throw new Error('people ID not found')
    return contactList.filter((c) => {
      return c.id === parseInt(options.peopleId)
    })
  }
}

module.exports = new Contact()