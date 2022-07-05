import { verify, decode } from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import { handleError } from '@helpers/handleError'
import { Socket } from 'socket.io'
import { ExtendedError } from 'socket.io/dist/namespace'

export const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.header('x-token')

        if (!token)
            return handleError(
                { status: 400, msg: 'token does not exists' },
                res
            )

        const { TOKEN_SEED } = process.env

        const decode = verify(token, String(TOKEN_SEED)) as any

        res.locals.uid = decode.uid
        res.locals.rol = decode.rol

        next()
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'invalid token',
        })
    }
}

export const verifySocketJWT = (
    socket: Socket,
    next: (err?: ExtendedError) => void
) => {
    const { token } = socket.handshake.query

    if (!token) return

    const { TOKEN_SEED } = process.env

    const { id, role } = decode(String(token)) as any

    if (!id) return

    socket.handshake.auth.uid = id
    socket.handshake.auth.rol = role

    return next()
}
