const twillio = require('twilio')(Tony.Config.sms.twilio.sid, Tony.Config.sms.twilio.token)
let contactList = require('../data/data')  // getting sample data

class Sms {

  async send(options) {
    try {
      let message = {body: options.body, from: Tony.Config.sms.twilio.number, to: options.to}
      return await twillio.messages.create(message)
    } catch (e) {
      throw new Error(e.message)
    }
  }

  async sendOTP(options) {
    try {
      if (!options.peopleId)
        throw new Error('people ID not found')
      let people = contactList.filter((c) => {
        return c.id === parseInt(options.peopleId)
      })
      if (people && people.length) {
        let sent = [];
        people = people[0]
        let sendDetails = {
          name: people.name,
          from: Tony.Config.sms.twilio.number,
          to: people.number,
          body: `Hi, your OTP is ${Math.floor(100000 + Math.random() * 900000)}`,
          meta: {
            created: Date.now()
          }
        }
        sendDetails['response'] = await this.send(sendDetails)
        return sendDetails
      } else {
        throw new Error('Contact not found!!!')
      }
    } catch (e) {
      throw new Error(e.message)
    }
  }
}


module.exports = new Sms()