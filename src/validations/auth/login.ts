import { Schema } from 'express-validator'

export const loginValidatorSchema: Schema = {
    email: {
        isEmpty: {
            errorMessage: 'The field must not be empty',
            negated: true,
        },
        isEmail: {
            errorMessage: 'Format invalid',
        },
        trim: true,
        normalizeEmail: true,
    },
    password: {
        isEmpty: {
            errorMessage: 'The field must not be empty',
            negated: true,
        },
        isString: true,
        trim: true,
        isLength: {
            errorMessage: 'The password must be at least 8 characters',
            options: {
                min: 8,
            },
        },
    },
}
