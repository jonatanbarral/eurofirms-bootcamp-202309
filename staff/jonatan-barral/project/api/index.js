require('dotenv').config()

const express = require('express')

const mongoose = require('mongoose')

const { cors } = require('./utils')

const { registerUserHandler, authenticateUserHandler, retrieveUserHandler, retrieveSecretariesHandler } = require('./handlers')

mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        const api = express()


        const jsonBodyParser = express.json()

        api.use(cors)

        api.post('/users', cors, jsonBodyParser, registerUserHandler)

        api.post('/users/auth', jsonBodyParser, authenticateUserHandler)

        api.get('/users', retrieveUserHandler)

        api.get('/users/secretaries', retrieveSecretariesHandler)


        api.listen(process.env.PORT, () => console.log(`API listening on port ${process.env.PORT}`))
    })