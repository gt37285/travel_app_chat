/**
 * http://localhost:{port}/api/v1/auth
 */

import { verifyJWT } from '@middlewares/jwt'
import { ValidateErrors } from '@middlewares/validateErr'
import AuthServices from '@services/auth'
import { loginValidatorSchema } from '@validate/auth/login'
import { userValidatorSchema } from '@validate/auth/user'
import { Router } from 'express'
import { checkSchema } from 'express-validator'

export default class AuthRoutes {
    private readonly router: Router
    private readonly service: AuthServices

    constructor() {
        this.router = Router()
        this.service = AuthServices.init()
        this.onInit()
    }

    static init() {
        return new AuthRoutes()
    }

    private onInit() {
        const { addNewUser, login, refresh } = this.service

        this.router
            .route('/auth/new')
            .post(checkSchema(userValidatorSchema), ValidateErrors, addNewUser)

        this.router
            .route('/auth/login')
            .post(
                checkSchema(loginValidatorSchema),
                ValidateErrors,
                login.bind(login)
            )

        this.router.route('/auth/refresh').put(verifyJWT, refresh)
    }

    get Routes() {
        return this.router
    }
}
