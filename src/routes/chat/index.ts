/**
 * http://localhost:{port}/api/v1/chat
 */

import { verifyJWT } from '@middlewares/jwt'
import ChatServices from '@services/chat'
import { Router } from 'express'

export default class ChatRoutes {
    private readonly router: Router
    private readonly service: ChatServices

    constructor() {
        this.router = Router()
        this.service = ChatServices.init()
        this.middlewares()

        this.onInit()
    }

    static init() {
        return new ChatRoutes()
    }

    private middlewares() {
        this.router.use(verifyJWT)
    }

    private onInit() {
        const { getMessages } = this.service

        this.router.route('/chat/messages/:from').get(getMessages)
    }

    get Routes() {
        return this.router
    }
}
