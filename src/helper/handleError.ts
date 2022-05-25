import { Response } from 'express'

export const handleError = (err: Record<string, any>, res: Response) => {
    let status = 500
    if (err.status) status = err.status

    return res.status(status).json({
        ok: false,
        err,
    })
}

export const handleErrorCatch = (err?: Record<string, unknown>) => {
    if (err)
        throw {
            status: 400,
            ...err,
        }

    throw new Error('contact with admin')
}
