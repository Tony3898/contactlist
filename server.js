global.Tony = {
  Config: {},
}
require('./src/misc/config')


const express = require("express")
const cors = require('cors');
const body_parser = require("body-parser")
const {info} = require("./src/misc/style")
const app = express()
const hbs = require('hbs')
const path = require('path')

global.APICLASSES = {}
require('./src/index')
// setup view engine
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, "views/partials"));
app.use(express.urlencoded({extended: false}))
app.use("/public/assets", express.static(path.join(__dirname, "/public/assets")));
hbs.registerPartials(path.join(__dirname, "views/partials"));

app.use(body_parser.urlencoded({extended: true}));
app.use(body_parser.json())
app.use(cors())


// setup route
app.use('/', require("./src/routes/partials"))
app.use('/app', require('./src/routes/app'))
app.use("/api", require('./src/routes/api'))

app.set('port', process.env.PORT || Tony.Config.connection.port)
app.listen(app.get('port'), () => {
  console.log(info("listening on" + app.get('port')))
})
