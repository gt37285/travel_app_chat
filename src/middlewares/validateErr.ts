import { Request, Response, NextFunction } from 'express'
import { validationResult } from 'express-validator'

export const ValidateErrors = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const err = validationResult(req)

    if (err.isEmpty()) return next()

    return res.status(400).json({
        ok: false,
        ...err.mapped(),
    })
}
