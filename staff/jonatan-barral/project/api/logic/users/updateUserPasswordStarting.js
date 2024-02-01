const bcrypt = require('bcryptjs')

const { validate } = require('../helpers')

const { User } = require('../../data/models')

const { ContentError, CredentialsError, NotFoundError, SystemError } = require('../errors')

function updateUserPasswordStarting(userId, password, newPassword, repeatNewPassword) {
    validate.id(userId, "user id")
    validate.password(password, "password")
    validate.password(newPassword, "new password")
    validate.password(repeatNewPassword, "repeat new password")

    if (newPassword !== repeatNewPassword) throw new ContentError("new password does not match repeat new password")

    if (password === newPassword) throw new ContentError("new password must be different from the current password")

    return User.findById(userId)
        .catch((error) => {
            throw new SystemError(error.message)
        })
        .then((user) => {
            if (!user) throw new NotFoundError("user not found")


            return bcrypt.compare(password, user.password)
                .catch((error) => {
                    throw new SystemError(error.message)
                })
                .then((match) => {
                    if (!match) throw new CredentialsError("wrong credentials")

                    bcrypt
                        .hash(newPassword, 8)
                        .then((hash) => {
                            user.password = hash
                            user.status = 'activated'
                            user.save()
                                .then(() => null)
                                .catch((error) => {
                                    throw new SystemError(error.message)
                                })
                        })

                })
        })
}

module.exports = updateUserPasswordStarting