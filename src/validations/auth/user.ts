import { Schema } from 'express-validator'

export const userValidatorSchema: Schema = {
    name: {
        isEmpty: {
            errorMessage: 'The field must not be empty',
            negated: true,
        },
        isString: true,
        trim: true,
        isLength: {
            errorMessage:
                'The field must be at least 2 characters and maximun 25 characters',
            options: {
                min: 2,
                max: 25,
            },
        },
    },
    lastName: {
        isEmpty: {
            errorMessage: 'The field must not be empty',
            negated: true,
        },
        isString: true,
        trim: true,
        isLength: {
            errorMessage:
                'The field must be at least 2 characters and maximun 25 characters',
            options: {
                min: 2,
                max: 25,
            },
        },
    },
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
