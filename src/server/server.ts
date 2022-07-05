import MainServer from './main'
import { Server } from 'socket.io'
import { verifySocketJWT } from '@middlewares/jwt'
import SocketController from '@services/socket'
import { Message } from '@interfaces/chat'
import { Rol } from '@interfaces/user'

export default class SocketServer extends MainServer {
    private readonly io: Server
    private Services: SocketController

    constructor() {
        super()
        this.io = new Server(this.server, {})
        this.Services = SocketController.init()

        this.socketMidlleware()
        this.listenEvents()
    }

    static init() {
        return new SocketServer()
    }

    private socketMidlleware() {
        this.io.use(verifySocketJWT)
    }

    private listenEvents() {
        this.io.on('connection', async (socket) => {
            const { uid, rol } = socket.handshake.auth as {
                uid: string
                rol: Rol
            }

            socket.join(uid)

            this.io.emit(
                'usersChat',
                await this.Services.connectDisconnectUser(true, uid)
            )

            // mensaje-personal
            socket.on('personal-message', async (message: Message) => {
                const messageEmit = {
                    ...message,
                    createdAt: new Date(),
                }

                await this.Services.saveMessage(message)

                this.io
                    .to(String(message.to))
                    .emit('personal-message', messageEmit)

                this.io
                    .to(String(message.from))
                    .emit('personal-message', messageEmit)
            })

            //videoCall
            // socket.on('videoCall', ({ to, from, room, cancell }) => {
            //     if (to && from && room) {
            //         this.io.to(to.uid).emit('videoCall', { from, room })
            //     }

            //     if (from && cancell) {
            //         this.io.to(to.uid).emit('cancellVideoCall', { from })
            //     }
            // })

            // socket.on('confirmVideoCall', ({ accept, from }) => {
            //     this.io.to(from.uid).emit('confirmVideoCall', { accept })
            // })

            socket.on('disconnect', async () => {
                this.io.emit(
                    'usersChat',
                    await this.Services.connectDisconnectUser(false, uid)
                )
            })
        })
    }

    public listen() {
        return this.server.listen(this.port, () =>
            console.log(`listening server on port ${this.port}`)
        )
    }
}
