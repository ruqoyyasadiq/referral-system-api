require('dotenv').config()
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const logger = require('morgan')
const models = require('./models')
const routes = require('./routes')

const environment = process.env.NODE_ENV

const app = express()

if (environment === 'development') {
  app.use(logger('dev'))
}

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Add routes for endpoints
app.use('/v1', routes())

// Fetch port value from env var or use default
const port = process.env.PORT || 8080;

// Connect server to DB via sequelize
models.sequelize.sync().then(() => {
  app.listen(port, () => {
    console.info(`App started on port ${port} on ${environment} environment`)
  })
})

module.exports = app
