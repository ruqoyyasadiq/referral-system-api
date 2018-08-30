const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const logger = require('morgan')
const models = require('./models')

dotenv.config()

const environment = process.env.NODE_ENV

const app = express()

if (environment === 'development') {
  app.use(logger('dev'))
}

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Fetch port value from env var or use default
const port = process.env.PORT || 8080;

models.sequelize.sync().then(() => {
  app.listen(port, () => {
    console.info(`App started on port ${port} on ${environment} environment`)
  })
})
