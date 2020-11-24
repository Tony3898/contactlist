const sms = require('../src/apis/sms')
const contact = require('../src/apis/contact')
let source = {sms, contact} // to add your classes, for api calls
// do not change this, just add all the class at *source* for api calls to work
Object.assign(APICLASSES, source)
