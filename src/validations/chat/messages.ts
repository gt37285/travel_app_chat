import { Schema } from 'express-validator'

export const MessagesValidation: Schema = {
    from: {
        isString: true,
        trim: true,
    },
    to: {},
    message: {},
}
