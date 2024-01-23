import { validate } from '../helpers'
import context from '../context'
import errors, { SystemError } from '../errors'

function retrieveSecretaries() {
    validate.jwt(context.jwt)

    const req = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${context.storage.token}`,
        },
    }

    return fetch(`${import.meta.env.VITE_API_URL}/users/secretaries`, req)
        .then((res) => {
            if (!res.ok) {
                return res.json().then((body) => {
                    const constructor = errors[body.error]
                    throw new constructor(body.message)
                })
            }
            return res.json()
        })
        .catch((error) => {
            throw new SystemError(error.message)
        })
}

export default retrieveSecretaries   