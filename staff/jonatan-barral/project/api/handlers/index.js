const authenticateUserHandler = require('./authenticate-user-handler')
const registerUserHandler = require('./register-user-handler')
const retrieveUserHandler = require('./retrieve-user-handler')
const retrieveJudgesHandler = require('./retrieve-judges-handler')
const retrieveSecretariesHandler = require('./retrieve-secretaries-handler')
const updateUserPasswordStartingHandler = require('./update-password-starting-handler')
const createCompetitionHandler = require('./create-competition-handler')

module.exports = {
    authenticateUserHandler,
    registerUserHandler,
    retrieveUserHandler,
    retrieveJudgesHandler,
    retrieveSecretariesHandler,
    updateUserPasswordStartingHandler,
    createCompetitionHandler
}