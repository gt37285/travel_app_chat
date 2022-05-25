import { JWT } from '@interfaces/jwt'
import { sign } from 'jsonwebtoken'

export const generateJWT = (payload: JWT): Promise<string> => {
    return new Promise((resolve, reject) => {
        const { TOKEN_SEED, TOKEN_EXP } = process.env

        sign(
            payload,
            String(TOKEN_SEED),
            {
                expiresIn: String(TOKEN_EXP),
            },
            (err, token) => {
                if (err) return reject(err)
                if (!token) return reject({ msg: 'token was not created' })
                return resolve(token)
            }
        )
    })
}
