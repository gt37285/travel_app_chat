import express, { Application, json, urlencoded, Router } from 'express'
import http from 'http'
import cors from 'cors'
import helmet from 'helmet'
import Routes from '@routes/index'

export default abstract class Server {
    protected readonly app: Application
    protected server: http.Server
    private readonly endpoint: Array<Router>
    protected readonly port: number

    constructor() {
        this.app = express()
        this.server = http.createServer(this.app)
        this.endpoint = Routes
        this.port = Number(process.env.PORT)

        this.middlewares()
    }

    private middlewares() {
        this.Security()
        this.Parser()
        this.routes()
    }

    private Security() {
        this.app.use(cors())
        this.app.use(helmet())
    }

    private routes() {
        this.app.use('/api/v1', this.endpoint)
    }

    private Parser() {
        this.app.use(json())
        this.app.use(urlencoded({ extended: false }))
    }
}
