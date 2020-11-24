let express = require('express');
let router = express.Router();

module.exports = router.get('/', (req, res, next) => {
  res.render('index.hbs', {
    digInUrl: Tony.Config.digInUrl ? Tony.Config.digInUrl : '/',
    project: Tony.Config.project_name,
    title: Tony.Config.project_name.toUpperCase(),
    loggedIn: true,
    username: Tony.Session && Tony.Session.username ? Tony.Session.username : 'tony3898'
  })
})